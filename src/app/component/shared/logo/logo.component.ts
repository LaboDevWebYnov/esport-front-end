import { Component, OnInit } from '@angular/core';
import {_document} from "@angular/platform-browser/src/browser";

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public logoClick(event): void{
    var activeOnglet = document.getElementsByClassName("activePage");
    activeOnglet[0].classList.remove("activePage");

    var homeButton = document.getElementsByClassName("home");
    homeButton[0].classList.add("activePage");
  }

}
