import { TestBed } from '@angular/core/testing';

import { FoodsApiService } from './foods-api.service';

describe('FoodsApiService', () => {
  let service: FoodsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
