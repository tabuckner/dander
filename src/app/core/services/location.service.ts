import { Injectable } from '@angular/core';
import { Geolocation, Coordinates } from '@ionic-native/geolocation/ngx';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private geolocation: Geolocation) { }

  public getLocation(): Observable<Coordinates> {
    return from(this.geolocation.getCurrentPosition()).pipe(
      map(resp => resp.coords)
    );
  }
}
