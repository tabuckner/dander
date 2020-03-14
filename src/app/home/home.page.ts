import { Component, OnInit } from '@angular/core';
import { DogsService } from '../core/services/dogs.service';
import { LocationService } from '../core/services/location.service';
import { Coordinates } from '@ionic-native/geolocation/ngx';
import { PetFinderService } from '../core/api/pet-finder.service';
import { PetFinderAnimalModel } from '../interfaces/pet-finder-animal-model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  public animals: PetFinderAnimalModel[];
  private coordinates: Coordinates;

  constructor(private dogsService: DogsService,
              private location: LocationService,
              private petFinder: PetFinderService) {}

  public ngOnInit() {
    this.location.getLocation().subscribe((coords) => {
      this.coordinates = coords;

      this.petFinder.getPetsByLat(this.coordinates).subscribe(data => {
        console.warn(data);
        this.animals = data.animals;
      });
    });
  }

  onRefresh() {
    this.dogsService.reset();
  }

}
