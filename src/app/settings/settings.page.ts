import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppLatLong, LocationService } from '../core/services/location.service';
import { SettingsService } from '../core/services/settings.service';
import { SETTINGS_KEYS } from '../core/enums/settings-keys.enum';
import { ToastController, ModalController } from '@ionic/angular';
import { TOAST_SETTINGS } from '../core/constants/settings/toast.settings';
import { FirebaseAuthService } from '../core/services/firebase-auth.service';
import { UserModel } from '../core/interfaces/user-model';
import { ViewWillEnter } from '../core/interfaces/lifecycle/view-will-enter';
import { LikesService } from '../core/services/likes.service';
import { FavoritesPage } from './favorites/favorites.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements ViewWillEnter {
  public location: AppLatLong;
  public locationUpdating = false;
  public userData: UserModel;
  public favorites: Array<{id: number}>;

  constructor(private storage: Storage,
              private settings: SettingsService,
              private locationService: LocationService,
              private toast: ToastController,
              private firebaseAuth: FirebaseAuthService,
              private likesService: LikesService,
              private modal: ModalController,
              private router: Router) { }

  public ionViewWillEnter() {
    this.settings.getSetting(SETTINGS_KEYS.location).then((location: AppLatLong) => {
      this.location = location;
    });
    this.firebaseAuth.userData$.subscribe(userData => {
      this.userData = userData;
    });
    this.likesService.favorites$.subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  public async onUpdateLocation() {
    this.locationUpdating = true;
    const updated = await this.locationService.updateLocation();
    let toastMessage;

    if (updated) {
      this.location = await this.settings.getSetting(SETTINGS_KEYS.location);
      toastMessage = 'Location updated successfully';
    } else {
      toastMessage = 'Location has not changed.';
    }

    const toast = await this.toast.create({
      message: toastMessage,
      duration: TOAST_SETTINGS.defaultDuration,
      buttons: [
        {
          side: 'end',
          icon: 'close',
          handler: () => {
            toast.dismiss();
          }
        }
      ]
    });
    toast.present();

    this.locationUpdating = false;
  }

  public onLogOut() {
    this.firebaseAuth.logOut();
  }

  public async onFavorites() {
    this.router.navigateByUrl('tabs/settings/favorites');
    // const modal = await this.modal.create({
    //   component: FavoritesPage
    // });
    // return await modal.present();
  }
}
