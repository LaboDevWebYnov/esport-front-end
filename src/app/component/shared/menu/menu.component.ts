import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
   private isConnectedMenu: string;
   localStorage: CoolLocalStorage;

  constructor(localStorage: CoolLocalStorage) {
    this.localStorage = localStorage;

  }

  ngOnInit() {
      this.isConnectedMenu = this.localStorage.getItem('isConnected');
      console.log("Connecté???? " + this.isConnectedMenu);
  }

  public clicked(event, option): void{

    let menuOnglets = document.getElementsByClassName("menuPage");
    _.each(menuOnglets, function (link) {
      link.className = 'menuPage'
    })

    event.path[0].className = 'menuPage activePage';

  }
}
