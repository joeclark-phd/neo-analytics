import { TestBed, inject } from '@angular/core/testing';

import { BackordersDataService } from './backorders-data.service';

describe('BackordersDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackordersDataService]
    });
  });

  it('should be created', inject([BackordersDataService], (service: BackordersDataService) => {
    expect(service).toBeTruthy();
  }));
});
