import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { anonymGuard } from './anonym.guard';

describe('anonymGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => anonymGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
