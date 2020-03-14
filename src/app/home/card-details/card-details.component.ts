import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CardModel } from 'src/app/core/interfaces/card-model';
import { PetFinderService } from 'src/app/core/api/pet-finder.service';
import { PetFinderOrganizationModel } from 'src/app/core/interfaces/pet-finder-organization-response-model';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {
  @Input() public card: CardModel;
  public orgInfo: PetFinderOrganizationModel;

  constructor(private modalController: ModalController,
              private petFinder: PetFinderService) { }

  ngOnInit() {
    this.getOrgInfo();
  }

  public onClose() {
    this.modalController.dismiss();
  }

  private getOrgInfo() {
    this.petFinder.getOrganization(this.card.organizationId).subscribe(data => {
      this.orgInfo = data;
    });
  }

}
