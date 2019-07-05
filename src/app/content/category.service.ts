import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: string[];

  constructor() {
    this.categories = [
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
    ]
  }

  getCategories () : string[] {
    return this.categories;
  }
}
