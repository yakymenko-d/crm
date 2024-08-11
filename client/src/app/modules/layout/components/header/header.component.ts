import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { getMe } from 'src/app/store/actions/users.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  me$ = this.store.select(getMe);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {}
}
