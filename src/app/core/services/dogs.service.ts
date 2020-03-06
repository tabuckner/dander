import { Injectable } from '@angular/core';
import { CardModel } from '../interfaces/card-model';
import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
import { MOCK_DOGS } from '../constants/mock-data';

@Injectable({
  providedIn: 'root'
})
export class DogsService {
  private dogs = new BehaviorSubject<CardModel[]>(MOCK_DOGS);

  constructor() { }

  public get dogs$(): Observable<CardModel[]> {
    return this.dogs.asObservable();
  }

  public reset() {
    this.dogs.next(MOCK_DOGS);
  }
}
