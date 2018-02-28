import { Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { Configuration } from '../../../../shared/app.constants';
import { ToornamentService} from "../../../../shared/services/toornament.service";

@Component({
  selector: 'app-details-tournament',
  templateUrl: './details-tournament.component.html',
  styleUrls: ['./details-tournament.component.css'],
  providers: [Configuration]
})
export class DetailsTournamentComponent implements OnInit {

  loclaStorage: CoolLocalStorage;

  public tournament = {
    Name: "Tournois de test",
    Creator: "Joueur Random",
    Date: "30 Fevrier 2018",
    Plateform: "PC",
    Game: "Rocket League",
  }

  public changeOnglet(event, option): void {
    let i, tabContent, tabLinks;

    tabContent = document.getElementsByClassName("content");

    tabLinks = document.getElementsByClassName("tablinks");
    _.each(tabLinks, function (link) {
      link.className = 'tablinks'
    })

    event.path[0].className = 'tablinks active';
    var id_content = event.path[0].innerText
    id_content = id_content.toLowerCase();
    document.querySelector('.content').innerHTML = document.getElementById(id_content).innerHTML;
  }


  constructor() { }

  ngOnInit() {
  }

}
