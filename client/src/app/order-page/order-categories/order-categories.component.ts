import { Component, OnInit } from '@angular/core';

import { CategoriesService } from '@shared/services/categories.service';
import { Category } from '@shared/interfaces';
import { Observable } from 'rxjs/index';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.scss', '../../app.component.scss'],
})
export class OrderCategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categories$ = this.categoriesService.fetch();
  }
}
