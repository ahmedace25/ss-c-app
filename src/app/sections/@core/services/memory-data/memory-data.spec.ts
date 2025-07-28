import { TestBed } from '@angular/core/testing';

import { MemoryData } from './memory-data';

describe('MemoryData', () => {
  let service: MemoryData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemoryData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
