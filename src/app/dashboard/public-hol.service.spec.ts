/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PublicHolService } from './public-hol.service';

describe('Service: PublicHol', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublicHolService]
    });
  });

  it('should ...', inject([PublicHolService], (service: PublicHolService) => {
    expect(service).toBeTruthy();
  }));
});
