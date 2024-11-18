import { TestBed } from '@angular/core/testing';

import { AcceptedcandidatService } from './acceptedcandidat.service';

describe('AcceptedcandidatService', () => {
  let service: AcceptedcandidatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcceptedcandidatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
