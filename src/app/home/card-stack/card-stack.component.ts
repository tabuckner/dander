import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SelectionEventModel } from 'src/app/core/interfaces/selection-event-model';
import { CardModel } from 'src/app/core/interfaces/card-model';
import { DogsService } from 'src/app/core/services/dogs.service';
import { CardChoices } from 'src/app/core/enums/card-choices.enum';
import { PetFinderAnimalModel } from 'src/app/interfaces/pet-finder-animal-model';

@Component({
  selector: 'app-card-stack',
  templateUrl: './card-stack.component.html',
  styleUrls: ['./card-stack.component.scss']
})
export class CardStackComponent implements OnInit {
  @Input() public animals: PetFinderAnimalModel[];
  @Output() public choiceMade = new EventEmitter<SelectionEventModel>();
  public cards: CardModel[] = [];

  constructor(private dogsService: DogsService) { }

  ngOnInit() {
    this.cards = this.animals.map((animal) => {
      const image = animal && animal.photos && animal.photos[0] && animal.photos[0].medium ? animal.photos[0].medium : 'https://www.bil-jac.com/Images/DogPlaceholder.svg';
      return {
        id: animal.id,
        name: animal.name,
        breed: animal.breeds.primary,
        imageUrl: image,
        description: animal.description
      } as CardModel;
    });
    console.warn(this.cards)
  }

  public onCardChoiceMade(choice: CardChoices, card: CardModel) {
    const selection: SelectionEventModel = { card, choice };
    this.choiceMade.emit(selection);
    setTimeout(() => {
      this.cards = this.cards.filter(_card => _card.id !== card.id);
    }, 300);
  }



}
