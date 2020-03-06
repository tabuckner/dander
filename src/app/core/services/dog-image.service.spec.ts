import { TestBed } from '@angular/core/testing';

import { DogImageService } from './dog-image.service';

describe('DogImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DogImageService = TestBed.get(DogImageService);
    expect(service).toBeTruthy();
  });
});
