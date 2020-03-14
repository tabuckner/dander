export interface CardModel {
  id: number; // Will this always work?
  name: string;
  breed: string;
  age: string | number;
  gender: string;
  size: string;
  imageUrl: string;
  description: string;
  externalUrl: string;
}
