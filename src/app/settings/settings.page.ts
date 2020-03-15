import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppLatLong, LocationService } from '../core/services/location.service';
import { SettingsService } from '../core/services/settings.service';
import { SETTINGS_KEYS } from '../core/enums/settings-keys.enum';
import { ToastController } from '@ionic/angular';
import { TOAST_SETTINGS } from '../core/constants/settings/toast.settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public location: AppLatLong;
  public locationUpdating = false;

  constructor(private storage: Storage,
              private settings: SettingsService,
              private locationService: LocationService,
              private toast: ToastController) { }

  async ngOnInit() {
    this.location = await this.settings.getSetting(SETTINGS_KEYS.location);
    console.warn(this.location);
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
    });
    toast.present();

    this.locationUpdating = false;
  }

}
