import { TestBed } from '@angular/core/testing';

import { TabParserService } from './tab-parser.service';

describe('TabParserService', () => {
  let service: TabParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
