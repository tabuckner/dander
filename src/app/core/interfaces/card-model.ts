import { Attributes } from './pet-finder-animal-model';

export interface CardModel {
  id: number; // Will this always work?
  name: string;
  breed: string;
  age: string | number;
  gender: string;
  size: string;
  imageUrl: string;
  additionalMediaUrls?: Array<AdditionalMediaModel>;
  description: string;
  externalUrl: string;
  published: string;
  lastUpdated: string;
  attributes: Attributes;
  organizationId: string;
}

export interface AdditionalMediaModel {
  type: 'image' | 'video';
  thumbnail: string;
  src: string;
}
