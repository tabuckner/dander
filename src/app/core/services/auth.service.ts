import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BASE_URL = 'https://api.petfinder.com/v2';
  private token: string;
  private expiresIn: number; // TODO: Automatically refresh the token using RxJS?

  constructor(private http: HttpClient) { }

  fetchToken() {
    const tokenUrl = `${this.BASE_URL}/oauth2/token`;
    const payload = {
      grant_type: 'client_credentials',
      client_id: environment.petFinder.id,
      client_secret: environment.petFinder.secret
    };

    return this.http.post(tokenUrl, payload).pipe(
      tap((response: { token_type: string, expires_in: number, access_token: string }) => {
        this.expiresIn = response.expires_in;
        this.token = response.access_token;
      }),
      mapTo(true)
    );
  }

  public getToken(): string {
    return this.token;
  }

}
