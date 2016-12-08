/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlayerAccountService } from './player-account.service';

describe('PlayerAccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerAccountService]
    });
  });

  it('should ...', inject([PlayerAccountService], (service: PlayerAccountService) => {
    expect(service).toBeTruthy();
  }));
});
