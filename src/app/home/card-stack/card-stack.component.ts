import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectionEventModel } from 'src/app/core/interfaces/selection-event-model';
import { CardModel } from 'src/app/core/interfaces/card-model';
import { DogsService } from 'src/app/core/services/dogs.service';
import { CardChoices } from 'src/app/core/enums/card-choices.enum';
import { PetFinderAnimalModel } from 'src/app/core/interfaces/pet-finder-animal-model';
import { PAGINATION_SETTINGS } from 'src/app/core/constants/settings/pagination.settings';
import { LikesService } from 'src/app/core/services/likes.service';
import { AnimalToCardService } from 'src/app/core/services/animal-to-card.service';

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

  constructor(private dogsService: DogsService,
              private likesService: LikesService,
              private animalToCard: AnimalToCardService) { }

  ngOnInit() {
    this.dogsService.animals$.subscribe(animals => {
      const nextCardBatch = this.animalToCard.mapAnimalsToCards(animals);
      this.cards.push(...nextCardBatch);
    });
  }

  public onCardChoiceMade(choice: CardChoices, card: CardModel) {
    const selection: SelectionEventModel = { card, choice };
    if (selection && selection.card && selection.card.id && selection.choice === CardChoices.like) {
      this.likesService.addFavorite(selection.card);
    }
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

  private get cardCountIsTooLow(): boolean {
    return this.cards.length <= PAGINATION_SETTINGS.pageSize / 3;
  }
}
