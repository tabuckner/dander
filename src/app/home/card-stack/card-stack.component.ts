import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectionEventModel } from 'src/app/core/interfaces/selection-event-model';
import { CardModel } from 'src/app/core/interfaces/card-model';
import { DogsService } from 'src/app/core/services/dogs.service';
import { CardChoices } from 'src/app/core/enums/card-choices.enum';
import { PetFinderAnimalModel } from 'src/app/core/interfaces/pet-finder-animal-model';
import { PAGINATION_SETTINGS } from 'src/app/core/constants/settings/pagination.settings';

@Component({
  selector: 'app-card-stack',
  templateUrl: './card-stack.component.html',
  styleUrls: ['./card-stack.component.scss']
})
export class CardStackComponent implements OnInit {
  @Output() public choiceMade = new EventEmitter<SelectionEventModel>();
  public cards: CardModel[] = [];
  public skeletonCards = new Array(20);
  public maxZIndex = PAGINATION_SETTINGS.pageSize;

  constructor(private dogsService: DogsService) { }

  ngOnInit() {
    this.dogsService.animals$.subscribe(animals => {
      const nextCardBatch = this.mapAnimalsToCards(animals);
      this.cards.push(...nextCardBatch);
    });
  }

  public onCardChoiceMade(choice: CardChoices, card: CardModel) {
    const selection: SelectionEventModel = { card, choice };
    this.choiceMade.emit(selection);
    setTimeout(() => {
      this.cards = this.cards.filter(_card => _card.id !== card.id);
      if (this.cardCountIsTooLow) {
        this.dogsService.getNextPage();
      }
    }, 300);
  }

  public getSafeScaleValue(i: number): number {
    return Math.max(0, (20 - i) / 20);
  }

  private mapAnimalsToCards(animals: PetFinderAnimalModel[]) {
    const cards = animals.map((animal) => {
      const normalizedName = animal.name.charAt(0).toUpperCase() + animal.name.slice(1).toLowerCase();
      const image = animal && animal.photos && animal.photos[0] && animal.photos[0].medium
        ? animal.photos[0].medium
        : 'https://www.bil-jac.com/Images/DogPlaceholder.svg';
      const breedString = animal.breeds.mixed
        ? `${animal.breeds.primary} and ${animal.breeds.secondary || 'Something'}`
        : animal.breeds.primary;

      const card: CardModel = {
        id: animal.id,
        name: normalizedName,
        breed: breedString,
        age: `${animal.age}`,
        gender: animal.gender,
        size: animal.size,
        imageUrl: image,
        description: animal.description,
        externalUrl: animal.url,
        published: animal.published_at,
        lastUpdated: animal.status_changed_at,
        attributes: { ...animal.attributes },
        organizationId: animal.organization_id,
      };
      return card;
    });
    return cards;
  }

  private get cardCountIsTooLow(): boolean {
    return this.cards.length <= PAGINATION_SETTINGS.pageSize / 3;
  }
}
