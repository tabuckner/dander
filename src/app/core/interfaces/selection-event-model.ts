import { CardModel } from './card-model';
import { CardChoices } from '../enums/card-choices.enum';

export interface SelectionEventModel {
  card: CardModel;
  choice: CardChoices;
}
