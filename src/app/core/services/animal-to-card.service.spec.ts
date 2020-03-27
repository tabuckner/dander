import { TestBed } from '@angular/core/testing';

import { AnimalToCardService } from './animal-to-card.service';

describe('AnimalToCardService', () => {
  let service: AnimalToCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalToCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
