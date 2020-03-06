import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DogImageService {

  constructor(private http: HttpClient) { }

  public getImageUrl(imageEndpoint: string): Observable<string> {
    return this.http.get(imageEndpoint).pipe(
      map((response: { message: string }) => response.message)
    );
  }
}
