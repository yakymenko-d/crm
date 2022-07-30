import {Component, OnInit} from '@angular/core'
import {CategoriesService} from '../../modules/shared/services/categories.service'
import {Observable} from 'rxjs/index'
import {Category} from '../../modules/shared/interfaces'

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.scss']
})
export class OrderCategoriesComponent implements OnInit {

  categories$: Observable<Category[]>

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categories$ = this.categoriesService.fetch()
  }

}
