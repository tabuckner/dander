import { Injectable } from '@angular/core';
import { Geolocation, Coordinates, Geoposition } from '@ionic-native/geolocation/ngx';
import { Observable, from, iif, of } from 'rxjs';
import { map, tap, switchMap, mergeMap } from 'rxjs/operators';
import { SettingsService } from './settings.service';
import { SETTINGS_KEYS } from '../enums/settings-keys.enum';
import { isNullOrUndefined } from 'util';

export interface AppLatLong {
  lat: number;
  long: number;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private geolocation: Geolocation,
    private settings: SettingsService) { }

  public getLocation(): Observable<AppLatLong> {
    const locationSetting$ = from(this.settings.getSetting<AppLatLong>(SETTINGS_KEYS.location));
    const currentPosition$ = from(this.geolocation.getCurrentPosition());

    return locationSetting$.pipe(mergeMap(
      (locationFromSettings: AppLatLong) => iif(
        () => isNullOrUndefined(locationFromSettings) || Object.keys(locationFromSettings).length < 1,
        currentPosition$.pipe(
          tap(() => console.warn('is null or undefined')),
          map(resp => this.mapGeopositionToAppLatLong(resp)),
          tap((nextAppLatLong) => {
            this.settings.setSetting(SETTINGS_KEYS.location, nextAppLatLong);
          }),
        ),
        of(locationFromSettings).pipe(
          tap(() => this.backgroundUpdateLocation(locationFromSettings))
        )
      )
    ));
  }

  /**
   * Updates location and returns true/false on whether there was an update.
   */
  public async updateLocation(): Promise<boolean> {
    const newPosition = await this.geolocation.getCurrentPosition();
    const nextLocation = this.mapGeopositionToAppLatLong(newPosition);
    const locationFromStorage = await this.settings.getSetting<AppLatLong>(SETTINGS_KEYS.location);

    if (!locationFromStorage) {
      await this.settings.setSetting(SETTINGS_KEYS.location, nextLocation);
      return true;
    }

    const locationsAreEqual = this.appLatLongsAreEqual(locationFromStorage, nextLocation);

    if (locationsAreEqual) {
      await this.settings.setSetting(SETTINGS_KEYS.location, nextLocation);
      return true;
    }

    if (!locationsAreEqual) {
      return false;
    }
  }

  private mapGeopositionToAppLatLong(geoposition: Geoposition): AppLatLong {
    return { lat: geoposition.coords.latitude, long: geoposition.coords.longitude };
  }

  private backgroundUpdateLocation(locationFromSettings: AppLatLong) {
    this.geolocation.getCurrentPosition().then((newPosition) => {
      const nextAppLatLong = this.mapGeopositionToAppLatLong(newPosition);
      if (this.appLatLongsAreEqual(locationFromSettings, nextAppLatLong)) {
        return;
      }

      this.settings.setSetting(SETTINGS_KEYS.location, nextAppLatLong);
    });
  }

  private appLatLongsAreEqual(before: AppLatLong, after: AppLatLong): boolean {
    const latHasNotChanged = after.lat !== before.lat;
    const longHasNotChanged = after.long !== before.long;
    return latHasNotChanged && longHasNotChanged;
  }
}
