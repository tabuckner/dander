import { TestBed } from '@angular/core/testing';

import { FirstLoadGuard } from './first-load.guard';

describe('FirstLoadGuard', () => {
  let guard: FirstLoadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FirstLoadGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
