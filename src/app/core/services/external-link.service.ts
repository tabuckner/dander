import { Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class ExternalLinkService {

  constructor(private iab: InAppBrowser) { }

  public openLink(url: string) {
    this.iab.create(url, '_blank', 'location=yes');
  }
}
