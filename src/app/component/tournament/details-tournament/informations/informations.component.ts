import { Component, OnInit } from '@angular/core';
import { Configuration } from '../../../../../shared/app.constants';
import { CoolLocalStorage } from 'angular2-cool-storage';


@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.css'],
  providers: [Configuration]
})
export class InformationsComponent implements OnInit {

  loclaStorage: CoolLocalStorage;

  public tournamentInfo = {
    Desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aperiam architecto cupiditate delectus deleniti ex " +
    "laboriosam minima possimus quae quasi quis quisquam tempore, ullam. Ab adipisci magnam mollitia sequi temporibus.",
    Rules: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam asperiores at cupiditate," +
    " dolor, ea eaque facilis harum illo laboriosam minima natus quis quo sint temporibus vero vitae! Quisquam, repellat?",
    BO1: "Direct eliminations",
    BO3: "Best-of 3 for win",
    Cash: "2 000 000 €"
  };

  constructor() { }

  ngOnInit() {
  }

}
