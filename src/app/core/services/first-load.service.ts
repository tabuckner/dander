import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export const FIRST_LOAD_KEY = 'firstLoad';
export const HAS_BEEN_ON_BOARDED_KEY = 'hasBeenOnBoarded';

@Injectable({
  providedIn: 'root'
})
export class FirstLoadService {

  constructor(private storage: Storage) {}

  public async shouldShowOnboarding(): Promise<boolean> {
    return await this.getHasBeenOnBoarded() !== true;
  }

  public async getHasBeenOnBoarded() {
    await this.storage.ready();
    return await this.storage.get(HAS_BEEN_ON_BOARDED_KEY);
  }

  public async setHasBeenOnBoarded(value: boolean) {
    await this.storage.ready();
    return await this.storage.set(HAS_BEEN_ON_BOARDED_KEY, value);
  }
}
