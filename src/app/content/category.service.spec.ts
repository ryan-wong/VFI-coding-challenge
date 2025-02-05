import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';

describe('CategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryService = TestBed.get(CategoryService);
    expect(service).toBeTruthy();
  });
  it('should be have array of strings', () => {
    const service: CategoryService = TestBed.get(CategoryService);
    expect(service.getCategories()).toEqual([
        'classics',
        'crime',
        'mystery',
        'fantasy',
        'horror',
        'literary ',
        'fiction',
        'popular',
        'romance',
        'science',
        'women',
        'young'
      ]);
  });
});
