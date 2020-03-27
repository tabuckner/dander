import { Injectable } from '@angular/core';
import { CardModel } from '../interfaces/card-model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserModel } from '../interfaces/user-model';
import { FirebaseAuthService } from './firebase-auth.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  private user: UserModel;
  private favoritesSubject = new BehaviorSubject<Array<{id: number}>>(undefined);

  constructor(private afStore: AngularFirestore,
              private firebaseAuth: FirebaseAuthService) {
    this.firebaseAuth.userData$.subscribe(userData => {
      if (!userData) {
        return;
      }
      this.user = userData;
      this.usersFavoritesCollection.valueChanges().subscribe(data => {
        this.favoritesSubject.next(data);
      });
    });
  }

  public get favorites$(): Observable<{id: number}[]> {
    return this.favoritesSubject.asObservable();
  }

  public addFavorite(card: CardModel) {
    const userRef: AngularFirestoreCollection<any> = this.usersFavoritesCollection;
    if (!userRef) {
      return;
    }
    const { id, name } = card;
    userRef.doc(`${id}`).set({ name, id, timestamp: new Date().toISOString() });
  }

  public removeFavorite(id: number) {
    const userRef: AngularFirestoreCollection<any> = this.usersFavoritesCollection;
    if (!userRef) {
      return;
    }
    return userRef.doc(`${id}`).delete();
  }

  private get usersFavoritesCollection(): AngularFirestoreCollection<{id: number}> {
    if (!this.user || !this.user.uid) {
      return;
    }
    return this.afStore.doc(`users/${this.user.uid}`).collection<{id: number}>('favorites', (ref => ref.orderBy('timestamp', 'desc')));
  }
}
