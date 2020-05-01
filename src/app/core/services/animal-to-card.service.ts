import { Injectable } from '@angular/core';
import { PetFinderAnimalModel, VideosEntity } from '../interfaces/pet-finder-animal-model';
import { CardModel, AdditionalMediaModel } from '../interfaces/card-model';

@Injectable({
  providedIn: 'root'
})
export class AnimalToCardService {
  private domParser = new DOMParser();

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
    const additionalMediaUrls = this.getAdditionalMediaUrls(animal);

    const card: CardModel = {
      id: animal.id,
      name: normalizedName,
      breed: breedString,
      age: `${animal.age}`,
      gender: animal.gender,
      size: animal.size,
      imageUrl,
      additionalMediaUrls,
      description: animal.description,
      externalUrl: animal.url,
      published: animal.published_at,
      lastUpdated: animal.status_changed_at,
      attributes: { ...animal.attributes },
      organizationId: animal.organization_id,
    };
    console.warn(card);

    return card;
  }

  private getNormalizedName(animal: PetFinderAnimalModel): string {
    return animal.name.charAt(0).toUpperCase() + animal.name.slice(1).toLowerCase();
  }

  private getImageUrl(animal: PetFinderAnimalModel): string { // NOTE: Dont use just medium.
    return animal && animal.photos && animal.photos[0] && animal.photos[0].medium
      ? animal.photos[0].medium
      : 'https://www.bil-jac.com/Images/DogPlaceholder.svg';
  }

  private getAdditionalMediaUrls(animal: PetFinderAnimalModel): Array<AdditionalMediaModel> {
    const hasPhotos = animal && animal.photos && animal.photos.length > 0;
    const hasVideos = animal && animal.videos && animal.videos.length > 0;
    if (!hasPhotos && !hasVideos) {
      return;
    }

    const returnArray: Array<AdditionalMediaModel> = [];

    if (hasPhotos) {
      for (const photo of animal.photos) { // NOTE: Dont use just medium.
        returnArray.push({ type: 'image', src: photo.full, thumbnail: photo.medium });
      }
    }

    if (hasVideos) {
      for (const video of animal.videos) {
        let videoThumbnail = 'https://i.ya-webdesign.com/images/video-play-arrow-png-18.png';
        const isHostedOnYouTube = video.embed.indexOf('youtube') > -1;
        if (isHostedOnYouTube) {
          videoThumbnail = this.getYouTubeThumbnail(video);
        }
        returnArray.push({ type: 'video', src: video.embed, thumbnail: videoThumbnail });
      }
    }

    return [...returnArray];
  }

  private getBreedString(animal: PetFinderAnimalModel): string {
    return animal.breeds.mixed
      ? `${animal.breeds.primary} and ${animal.breeds.secondary || 'Something'}`
      : animal.breeds.primary;
  }

  private getYouTubeThumbnail(video: VideosEntity): string {
    const videoSrc = this.domParser.parseFromString(video.embed, 'text/html').getElementsByTagName('iframe')[0].src;
    const videoId = videoSrc.split('www.youtube.com/embed/')[1];
    const supposedThumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`;
    return supposedThumbnail;
  }
}
