import { TestBed } from '@angular/core/testing';

import { PetFinderService } from './pet-finder.service';

describe('PetFinderService', () => {
  let service: PetFinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetFinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
