import { Injectable } from '@angular/core';
import { PetFinderAnimalModel } from '../interfaces/pet-finder-animal-model';
import { CardModel } from '../interfaces/card-model';

@Injectable({
  providedIn: 'root'
})
export class AnimalToCardService {

  constructor() { }

  public mapAnimalsToCards(animals: PetFinderAnimalModel[]): CardModel[] {
    const cards = animals.map((animal) => {
      return this.mapAnimalToCard(animal);
    });
    return cards;
  }

  public mapAnimalToCard(animal: PetFinderAnimalModel): CardModel {
    const normalizedName = this.getNormalizedName(animal);
    const imageUrl = this.getImageUrl(animal);
    const breedString = this.getBreedString(animal);

    const card: CardModel = {
      id: animal.id,
      name: normalizedName,
      breed: breedString,
      age: `${animal.age}`,
      gender: animal.gender,
      size: animal.size,
      imageUrl,
      description: animal.description,
      externalUrl: animal.url,
      published: animal.published_at,
      lastUpdated: animal.status_changed_at,
      attributes: { ...animal.attributes },
      organizationId: animal.organization_id,
    };
    return card;
  }

  private getNormalizedName(animal: PetFinderAnimalModel): string {
    return animal.name.charAt(0).toUpperCase() + animal.name.slice(1).toLowerCase();
  }

  private getImageUrl(animal: PetFinderAnimalModel): string {
    return animal && animal.photos && animal.photos[0] && animal.photos[0].medium
      ? animal.photos[0].medium
      : 'https://www.bil-jac.com/Images/DogPlaceholder.svg';
  }

  private getBreedString(animal: PetFinderAnimalModel): string {
    return animal.breeds.mixed
      ? `${animal.breeds.primary} and ${animal.breeds.secondary || 'Something'}`
      : animal.breeds.primary;
  }
}
