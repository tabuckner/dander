import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Coordinates } from '@ionic-native/geolocation/ngx';
import { Observable } from 'rxjs';
import { PetFinderAnimalModel } from 'src/app/interfaces/pet-finder-animal-model';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PetFinderService {
  private readonly BASE_URL = 'https://api.petfinder.com/v2';

  constructor(private http: HttpClient) { }

  public getPetsByLat(coordinates: Coordinates): Observable<{ animals: PetFinderAnimalModel[], pagination: any }> {
    const url = `${this.BASE_URL}/animals`;
    const httpOptions = {
      params: new HttpParams()
        .set('location', `${coordinates.latitude},${coordinates.longitude}`)
        .set('distance', '25')
        .set('type', 'Dog')
    };

    return this.http.get<{ animals: PetFinderAnimalModel[], pagination: any }>(url, httpOptions);
  }


  public getImage(url: string): Observable<any> {
    return this.http.get(url);
  }
}
