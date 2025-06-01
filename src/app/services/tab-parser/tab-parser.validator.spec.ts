import { TestBed } from '@angular/core/testing';

import { TabParserValidator } from './tab-parser.validator';

describe('TabParserValidator', () => {
  let validator: TabParserValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    validator = TestBed.inject(TabParserValidator);
  });

  it('should be created', () => {
    expect(validator).toBeTruthy();
  });
});
