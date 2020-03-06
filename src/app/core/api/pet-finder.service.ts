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
  private token: string;

  constructor(private http: HttpClient) { }

  public getPetsByLat(coordinates: Coordinates): Observable<{ animals: PetFinderAnimalModel[], pagination: any }> {
    const url = `${this.BASE_URL}/animals`;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      }),
      params: new HttpParams()
        .set('location', `${coordinates.latitude},${coordinates.longitude}`)
        .set('distance', '25')
      // .set('type', 'Dog')
    };

    return this.http.get<{ animals: PetFinderAnimalModel[], pagination: any }>(url, httpOptions);
  }

  public getAccessToken(): Observable<boolean> {
    const tokenUrl = `${this.BASE_URL}/oauth2/token`;
    const payload = {
      grant_type: 'client_credentials',
      client_id: environment.petFinder.id,
      client_secret: environment.petFinder.secret
    };

    return this.http.post(tokenUrl, payload).pipe(
      tap((response: { token_type: string, expires_in: number, access_token: string }) => {
        this.token = response.access_token;
      }),
      map(_ => true)
    );
  }

  public getImage(url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    };
    return this.http.get(url, httpOptions);
  }
}
