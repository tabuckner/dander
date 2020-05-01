import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { CardModel, AdditionalMediaModel } from 'src/app/core/interfaces/card-model';
import { PetFinderService } from 'src/app/core/api/pet-finder.service';
import { PetFinderOrganizationModel } from 'src/app/core/interfaces/pet-finder-organization-response-model';
import { ExternalLinkService } from 'src/app/core/services/external-link.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer, EmailComposerOptions } from '@ionic-native/email-composer/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {
  @Input() public card: CardModel;
  public orgInfo: PetFinderOrganizationModel;
  public addressInfo: {
    street: string;
    cityStateZip: string;
  } = { street: undefined, cityStateZip: undefined };
  public addressSearchQuery: string;
  public canCall = false;
  public canEmail = true;
  public isMobile = false;

  constructor(private modalController: ModalController,
              private petFinder: PetFinderService,
              private externalLink: ExternalLinkService,
              private callNumber: CallNumber,
              private emailComposer: EmailComposer,
              private navigation: LaunchNavigator,
              private platform: Platform) { }

  ngOnInit() {
    this.isMobile = !this.platform.is('tablet') || !this.platform.is('desktop');
    this.getOrgInfo();
    this.callNumber.isCallSupported().then(val => this.canCall = val).catch(() => this.canCall = false);
    try {
      this.emailComposer.hasClient().then(val => {
        this.canEmail = val;
        this.isMobile = true;
      }).catch();
    } catch { }
  }

  public onClose() {
    this.modalController.dismiss();
  }

  public onOrganization() {
    if (!this.orgInfo || !this.orgInfo.website || this.orgInfo.website.length < 1) {
      return;
    }
    this.externalLink.openLink(this.orgInfo.website);
  }

  public onViewAdoption() {
    this.externalLink.openLink(this.card.externalUrl);
  }

  public onCall() {
    if (!this.canCall) {
      return;
    }

    this.callNumber.callNumber(this.orgInfo.phone, true);
  }

  public onEmail() {
    if (!this.canEmail) {
      return;
    }

    const email: EmailComposerOptions = {
      to: this.orgInfo.email,
      subject: `Adoption Interest // ${this.card.name}`,
      body: `Hello, I was hoping to get some more information on ${this.card.name}`
    };
    this.emailComposer.open(email);
  }

  public onLocation() {
    this.navigation.navigate(`${this.addressInfo.street} ${this.addressInfo.cityStateZip}`);
  }

  public async onTapThumbnail(thumbnail: AdditionalMediaModel) {
    return await this.presentImageModal(thumbnail.src);
  }

  private async presentImageModal(url: string) {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      componentProps: {
        src: url
      }
    });
    return await modal.present();
  }

  private getOrgInfo() {
    this.petFinder.getOrganization(this.card.organizationId).subscribe(data => {
      this.orgInfo = data;
      this.setAddressString(data);
    });
  }

  private setAddressString(data: PetFinderOrganizationModel) {
    this.addressInfo.street = `${data.address.address1 || ''} ${data.address.address2 || ''}`.trim();
    this.addressInfo.cityStateZip = `${data.address.city}, ${data.address.state} ${data.address.postcode}`.trim();
    const safeName = `${data.name ? data.name + ' ' : ''}`;
    const safeStreet = `${this.addressInfo.street ? this.addressInfo.street + ' ' : ''}`;
    const safeZip = `${this.addressInfo.cityStateZip}`;
    this.addressSearchQuery = `${safeName}${safeStreet}${safeZip}`;
  }
}
