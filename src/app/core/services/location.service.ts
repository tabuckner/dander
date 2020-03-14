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
          map(resp => (this.mapGeopositionToAppLatLong(resp))),
        ),
        of(locationFromSettings).pipe(
          tap(() => this.backgroundUpdateLocation(locationFromSettings))
        )
      )
    ));
  }

  private mapGeopositionToAppLatLong(geoposition: Geoposition): AppLatLong {
    return { lat: geoposition.coords.latitude, long: geoposition.coords.longitude };
  }

  private backgroundUpdateLocation(locationFromSettings: AppLatLong) {
    this.geolocation.getCurrentPosition().then((newPosition) => {
      const nextAppLatLong = this.mapGeopositionToAppLatLong(newPosition);
      const latHasChanged = nextAppLatLong.lat !== locationFromSettings.lat;
      const longHasChanged = nextAppLatLong.long !== locationFromSettings.long;
      if (!latHasChanged || !longHasChanged) {
        return;
      }
      this.settings.setSetting(SETTINGS_KEYS.location, nextAppLatLong);
    });
  }
}
