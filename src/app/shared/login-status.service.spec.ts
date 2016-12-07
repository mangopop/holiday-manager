/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoginStatusService } from './login-status.service';

describe('Service: LoginStatus', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginStatusService]
    });
  });

  it('should ...', inject([LoginStatusService], (service: LoginStatusService) => {
    expect(service).toBeTruthy();
  }));
});
