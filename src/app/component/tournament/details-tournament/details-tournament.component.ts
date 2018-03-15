import * as _ from 'lodash';
import { Component, OnInit, AfterContentInit } from '@angular/core';
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
    TotalPlace: "32",
    PlaceLoked: "12",
  };



    game_id: "5a61e8d69fe0d61c36c54253";

  public changeOnglet(event, option): void {

    let tabLinks = document.getElementsByClassName("tablinks");
    _.each(tabLinks, function (link) {
      link.className = 'tablinks'
    })

    event.path[0].className = 'tablinks active';



    var id_content = option;
    document.querySelector('.content').innerHTML = document.getElementById(id_content).innerHTML;
  }


  constructor() {
  }

  ngOnInit() {
    document.querySelector('.content').innerHTML = document.getElementById("informations").innerHTML;
  }

  ngAfterContentInit(){
    document.querySelector('.fa-calendar').removeAttribute('_ngcontent-c4')
  }
}
