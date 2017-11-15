import { Component, OnInit } from '@angular/core';
import {Configuration} from '../../../../shared/app.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [Configuration]
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
