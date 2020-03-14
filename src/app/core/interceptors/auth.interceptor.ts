import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService,
              private toastController: ToastController) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.warn('intercept', request)

    let token: string = this.auth.getToken();

    if (token) {
      request = this.addTokenToRequest(request, token);
    }

    request = this.addAppropriateHeadersToRequest(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.warn('error', error)
        if (error.status === 401 || error.status === 0) {
          console.warn(error);

          return this.auth.fetchToken().pipe(
            flatMap(() => {
              token = this.auth.getToken();
              console.warn('token', token)

              if (token) {
                request = this.addTokenToRequest(request, token);
              }

              request = this.addAppropriateHeadersToRequest(request);

              return next.handle(request);
            })
          );
        }
        return throwError(error);
      }));
  }

  public async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  private addAppropriateHeadersToRequest(request: HttpRequest<any>) {
    return request;
    if (this.requestDoesNotHaveContentType(request)) {
      request = this.addCorrectContentTypeToRequest(request);
    }
    request = this.addAcceptHeadersToRequest(request);
    return request;
  }

  private addAcceptHeadersToRequest(request: HttpRequest<any>) {
    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });
    return request;
  }

  private addCorrectContentTypeToRequest(request: HttpRequest<any>) {
    request = request.clone({
      setHeaders: {
        'content-type': 'application/json'
      }
    });
    return request;
  }

  private requestDoesNotHaveContentType(request: HttpRequest<any>) {
    return !request.headers.has('Content-Type');
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return request;
  }
}
