import { Injectable } from '@angular/core';
import { SETTINGS_KEYS } from '../enums/settings-keys.enum';
import { Storage } from '@ionic/storage';
import * as cloneDeep from 'lodash.clonedeep';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private storage: Storage) { }

  public async setSetting<T>(key: SETTINGS_KEYS, value: any): Promise<T> {
    await this.storage.ready();
    return await this.storage.set(key, value);
  }

  public async getSetting<T>(key: SETTINGS_KEYS): Promise<T> {
    await this.storage.ready();
    return await this.storage.get(key);
  }
}
