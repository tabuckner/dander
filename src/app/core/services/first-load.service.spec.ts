import { TestBed } from '@angular/core/testing';

import { FirstLoadService } from './first-load.service';

describe('FirstLoadService', () => {
  let service: FirstLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirstLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
