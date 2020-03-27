import { Component } from '@angular/core';
import { ViewWillEnter } from '../../core/interfaces/lifecycle/view-will-enter';
import { LikesService } from '../../core/services/likes.service';
import { ModalController, Platform, NavController } from '@ionic/angular';
import { CardDetailsComponent } from '../../home/card-details/card-details.component';
import { PetFinderService } from '../../core/api/pet-finder.service';
import { AnimalToCardService } from '../../core/services/animal-to-card.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements ViewWillEnter {
  public favorites: Array<any>;
  private isMobile = false;

  constructor(private likes: LikesService,
              private modal: ModalController,
              private petFinder: PetFinderService,
              private animalToCard: AnimalToCardService,
              private platform: Platform,
              private nav: NavController) { }

  public ionViewWillEnter() {
    this.isMobile = !this.platform.is('tablet') || !this.platform.is('desktop');
    this.likes.favorites$.subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  public onClose() {
    this.nav.pop();
  }

  public async onSelectFavorite(id: number) {
    const response = await this.petFinder.getPet(id).toPromise();
    const card = this.animalToCard.mapAnimalToCard(response.animal);
    const detailModal = await this.modal.create({

      component: CardDetailsComponent,
      swipeToClose: true,
      componentProps: {
        card: { ...card }
      },
      cssClass: this.isMobile ? 'modal--is-mobile' : ''
    });
    return await detailModal.present();
  }

  public onRemoveFavorite(id: number) {
    this.likes.removeFavorite(id);
  }

}
