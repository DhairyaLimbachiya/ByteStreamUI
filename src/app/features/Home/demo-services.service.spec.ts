import { TestBed } from '@angular/core/testing';

import { DemoServicesService } from './demo-services.service';

describe('DemoServicesService', () => {
  let service: DemoServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemoServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
