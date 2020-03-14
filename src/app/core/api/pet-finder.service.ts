import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Coordinates } from '@ionic-native/geolocation/ngx';
import { Observable } from 'rxjs';
import { PetFinderAnimalModel } from 'src/app/core/interfaces/pet-finder-animal-model';
import { PetFinderAnimalsResponseModel } from '../interfaces/pet-finder-animals-response-model';
import { PAGINATION_SETTINGS } from '../constants/settings/pagination.settings';
import { PetFinderOrganizationResponseModel, PetFinderOrganizationModel } from '../interfaces/pet-finder-organization-response-model';
import { map } from 'rxjs/operators';
import { AppLatLong } from '../services/location.service';

@Injectable({
  providedIn: 'root'
})
export class PetFinderService {
  private readonly BASE_URL = 'https://api.petfinder.com';
  private readonly apiVersion = 'v2';

  constructor(private http: HttpClient) { }

  public getPetsByCoordinates(coordinates: AppLatLong): Observable<PetFinderAnimalsResponseModel> {
    const url = `${this.BASE_URL}/${this.apiVersion}/animals`;
    const httpOptions = {
      params: new HttpParams()
        .set('location', `${coordinates.lat},${coordinates.long}`)
        .set('distance', '25')
        .set('type', 'Dog')
        .set('limit', `${PAGINATION_SETTINGS.pageSize}`)
    };

    return this.http.get<PetFinderAnimalsResponseModel>(url, httpOptions);
  }

  public getResultsPage(page: string): Observable<PetFinderAnimalsResponseModel> {
    const url = `${this.BASE_URL}${page}`;
    return this.http.get<PetFinderAnimalsResponseModel>(url);
  }

  public getOrganization(orgId: string): Observable<PetFinderOrganizationModel> { // TODO: Type
    const url = `${this.BASE_URL}/${this.apiVersion}/organizations/${orgId}`;
    return this.http.get<PetFinderOrganizationResponseModel>(url).pipe(
      map(response => response.organization)
    );
  }


  public getImage(url: string): Observable<any> {
    return this.http.get(url);
  }
}
