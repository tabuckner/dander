import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree, CanActivateChild } from '@angular/router';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { Observable, from } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {

  constructor(private auth: FirebaseAuthService,
    private router: Router) { }

  public canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return from(this.auth.isLoggedIn()).pipe(
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          return this.handleNotAuthorized();
        }

        return true;
      })
    );
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return from(this.auth.isLoggedIn()).pipe(
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          return this.handleNotAuthorized();
        }

        return true;
      })
    );
  }

  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return from(this.auth.isLoggedIn()).pipe(
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          return this.handleNotAuthorized();
        }

        return true;
      })
    );
  }

  private handleNotAuthorized(): boolean {
    this.router.navigateByUrl('/login');
    return false;
  }
}
