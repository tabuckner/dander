import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { PetFinderAnimalModel } from '../interfaces/pet-finder-animal-model';
import { Coordinates } from '@ionic-native/geolocation/ngx';
import { PetFinderService } from '../api/pet-finder.service';
import { PetFinderAnimalsResponseModel } from '../interfaces/pet-finder-animals-response-model';
import { PetFinderPaginationModel } from '../interfaces/pet-finder-pagination-model';
import { PET_FINDER_RESPONSE_MOCK } from '../constants/mocks/pet-finder-response.mock';
import { AppLatLong } from './location.service';

@Injectable({
  providedIn: 'root'
})
export class DogsService {
  private animalsSubject = new Subject<PetFinderAnimalModel[]>();
  private pagination: PetFinderPaginationModel;

  constructor(private petFinder: PetFinderService) { }

  public get animals$(): Observable<PetFinderAnimalModel[]> {
    return this.animalsSubject.asObservable();
  }

  public getAnimals(coordinates: AppLatLong) {
    // this.getPetsSuccess(PET_FINDER_RESPONSE_MOCK);
    this.petFinder.getPetsByCoordinates(coordinates).subscribe(data => {
      this.getPetsSuccess(data);
    });
  }

  public getNextPage() {
    this.petFinder.getResultsPage(this.nextPage).subscribe(data => {
      this.getPetsSuccess(data);
    });
  }

  private getPetsSuccess(data: PetFinderAnimalsResponseModel) {
    console.warn(data)
    this.animalsSubject.next(data.animals);
    this.pagination = data.pagination;
  }

  private get nextPage(): string {
    return this.pagination._links.next.href;
  }

}
