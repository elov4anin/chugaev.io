import { TestBed, inject } from '@angular/core/testing';

import { VkService } from './vk.service';

describe('VkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VkService]
    });
  });

  it('should ...', inject([VkService], (service: VkService) => {
    expect(service).toBeTruthy();
  }));
});
