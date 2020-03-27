import { Component, OnInit } from '@angular/core';
import { FirstLoadService } from '../core/services/first-load.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  public slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private firstLoad: FirstLoadService,
              private router: Router) { }

  ngOnInit() {
  }

  public async onContinue() {
    await this.firstLoad.setHasBeenOnBoarded(true);
    await this.router.navigateByUrl('');
  }

}
