import { Component, OnInit } from '@angular/core';

import { CategoriesService } from '../modules/shared/services/categories.service';
import { Category } from '../modules/shared/interfaces';
import { Observable } from 'rxjs/index';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: [
    './categories-page.component.scss',
    '../../app/app.component.scss',
  ],
})
export class CategoriesPageComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categories$ = this.categoriesService.fetch();
  }
}
