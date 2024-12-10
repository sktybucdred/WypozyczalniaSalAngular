import { TestBed } from '@angular/core/testing';

import { UdogodnieniaService } from './udogodnienia.service';

describe('UdogodnieniaService', () => {
  let service: UdogodnieniaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UdogodnieniaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
