import { Component, OnInit } from '@angular/core';
import { DogsService } from '../core/services/dogs.service';
import { LocationService, AppLatLong } from '../core/services/location.service';
import { Coordinates, Geolocation } from '@ionic-native/geolocation/ngx';
import { PetFinderService } from '../core/api/pet-finder.service';
import { PetFinderAnimalModel } from '../core/interfaces/pet-finder-animal-model';
import { forkJoin } from 'rxjs';
import { PetFinderPaginationModel } from '../core/interfaces/pet-finder-pagination-model';
import { PetFinderAnimalsResponseModel } from '../core/interfaces/pet-finder-animals-response-model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  private coordinates: AppLatLong;

  constructor(private location: LocationService,
              private dogsService: DogsService,
              private geo: Geolocation) {}

  public ngOnInit() {
    this.location.getLocation().subscribe((coords) => {
      this.coordinates = coords;
      this.dogsService.getAnimals(this.coordinates);
    });
  }

  public onGetNextPage() {
    this.dogsService.getNextPage();
  }
}
