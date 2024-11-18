import { TestBed } from '@angular/core/testing';

import { SujetServiceService } from './sujet-service.service';

describe('SujetServiceService', () => {
  let service: SujetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SujetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
