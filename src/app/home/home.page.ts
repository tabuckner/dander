import { Component } from '@angular/core';
import { DogsService } from '../core/services/dogs.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(private dogsService: DogsService) {}

  onRefresh() {
    this.dogsService.reset();
  }

}
