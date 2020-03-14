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

  constructor(private dogsService: DogsService) { }

  ngOnInit() {
    this.dogsService.animals$.subscribe(animals => {
      const nextCardBatch = this.mapAnimalsToCards(animals);
      this.cards.push(...nextCardBatch);
    });
  }

  private mapAnimalsToCards(animals: PetFinderAnimalModel[]) {
    const cards = animals.map((animal) => {
      const image = animal && animal.photos && animal.photos[0] && animal.photos[0].medium
        ? animal.photos[0].medium
        : 'https://www.bil-jac.com/Images/DogPlaceholder.svg';
      return {
        id: animal.id,
        name: animal.name,
        breed: animal.breeds.primary,
        imageUrl: image,
        description: animal.description
      } as CardModel;
    });
    return cards;
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


  private get cardCountIsTooLow(): boolean {
    return this.cards.length <= PAGINATION_SETTINGS.pageSize / 3;
  }
}
