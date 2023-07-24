import { TestBed } from '@angular/core/testing';

import { NewsStateModule } from './news-state.module';

describe('[NewsStoreModule]', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsStateModule],
    }).compileComponents();
  });

  it('should create', () => {
    expect(NewsStateModule).toBeDefined();
  });
});
