import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { FirstLoadService } from '../services/first-load.service';

@Injectable({
  providedIn: 'root'
})
export class OnBoardingGuard implements CanActivate, CanLoad {

  constructor(private firstLoad: FirstLoadService,
              private router: Router) { }

  public async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Promise<boolean> {
    const shouldShowOnboarding = await this.firstLoad.shouldShowOnboarding();

    if (shouldShowOnboarding) {
      this.router.navigateByUrl('/onboarding');
      return shouldShowOnboarding;
    }

    return !shouldShowOnboarding;
  }

  public async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const shouldShowOnboarding = await this.firstLoad.shouldShowOnboarding();

    if (shouldShowOnboarding) {
      this.router.navigateByUrl('/onboarding');
      return shouldShowOnboarding;
    }

    return !shouldShowOnboarding;
  }

}
