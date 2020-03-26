import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserModel } from '../interfaces/user-model';
import { auth } from 'firebase/app';
import { Observable, BehaviorSubject } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { TOAST_SETTINGS } from '../constants/settings/toast.settings';

export const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  private userData: UserModel;
  private userDataSubject = new BehaviorSubject<UserModel>(undefined);

  constructor(public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private storage: Storage,
    private toast: ToastController) {
    this.storage.ready().then(() => {
      this.ngFireAuth.authState.subscribe((user) => {
        if (!user) {
          return;
        }
        const nextUserData = this.mapFirestoreUserToUserModel(user);
        this.updateUserData(nextUserData);
      });
    });
  }

  public get userData$(): Observable<UserModel> {
    return this.userDataSubject.asObservable();
  }

  public logIn(email: string, password: string) {
    return this.ngFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public register(email: string, password: string) {
    return this.ngFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  public sendVerificationMail() {
    return this.ngFireAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.showToast('Verification email sent.');
      });
  }

  public recoverPassword(passwordResetEmail: string) {
    return this.ngFireAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email has been sent, please check your inbox.'); // NOTE: Cant use window.
      }).catch((error) => {
        window.alert(error);
      });
  }

  public async isLoggedIn(): Promise<boolean> {
    try {
      const user = await this.storage.get(USER_STORAGE_KEY) as UserModel;
      return user !== null && user.emailVerified !== false;
    } catch (e) {
      return false;
    }
  }

  public async isEmailVerified(): Promise<boolean> {
    const user = await this.storage.get(USER_STORAGE_KEY) as UserModel;
    return (user.emailVerified !== false) ? true : false;
  }

  public googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  public authLogin(provider: firebase.auth.AuthProvider) {
    return this.ngFireAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.setUserData(result.user).then(() => {
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');
          });
          this.showToast('Successfully logged in!');
        });
      }).catch((error) => {
        this.showToast('Unable to log in. Please try again later.');
      });
  }

  public setUserData(user: UserModel) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: UserModel = this.mapFirestoreUserToUserModel(user);
    this.updateUserData(userData);
    return userRef.set(userData, {
      merge: true
    });
  }


  public logOut() {
    return this.ngFireAuth.auth.signOut().then(() => {
      this.storage.remove(USER_STORAGE_KEY);
      this.updateUserData(undefined);
      this.router.navigateByUrl('/');
      this.showToast('Successfully logged out');
    });
  }

  private mapFirestoreUserToUserModel(firestoreUser): UserModel {
    const userData: UserModel = {
      uid: firestoreUser.uid,
      email: firestoreUser.email,
      displayName: firestoreUser.displayName,
      photoURL: firestoreUser.photoURL,
      emailVerified: firestoreUser.emailVerified
    };
    return userData;
  }

  private updateUserData(nextUserData: UserModel) {
    this.userData = nextUserData;
    this.userDataSubject.next(this.userData);
    this.storage.set(USER_STORAGE_KEY, this.userData);
  }

  private showToast(message: string) {
    this.toast.create({
      message,
      duration: TOAST_SETTINGS.defaultDuration,
    }).then(toast => {
      toast.present();
    });
  }
}
