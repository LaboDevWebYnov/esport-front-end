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
  }

  public clicked(event, option): void{
    var activeOnglet = document.getElementsByClassName("activePage");
    activeOnglet[0].classList.remove("activePage");
    if(option === "userImage"){
      event.path[0].className = "fa fa-user activePage";
    }
    else if(option === "messageImage"){
      event.path[0].className = 'fa fa-envelope activePage';
    }
    else{
      event.path[0].className = 'menuPage menu_letter2 activePage';
    }
  }
}
