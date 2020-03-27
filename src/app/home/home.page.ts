import { Component, OnInit } from '@angular/core';
import { DogsService } from '../core/services/dogs.service';
import { LocationService, AppLatLong } from '../core/services/location.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  private coordinates: AppLatLong;

  constructor(private location: LocationService,
              private dogsService: DogsService) {}

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
