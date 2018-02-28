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
    TotalPlace: "32",
    PlaceLoked: "12",
  }

  public changeOnglet(event, option): void {
    let i, tabContent, tabLinks;

    tabContent = document.getElementsByClassName("content");
    for (i = 0; i < tabContent.length; i++) {
      (<HTMLInputElement>tabContent[i]).style.display = "none";
    }

    tabLinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tabLinks.length; i++) {
      (<HTMLInputElement>tabLinks[i]).className = tabLinks[i].className.replace(" active", "");
    }

    (<HTMLInputElement>document.getElementById(option)).style.display = "block";
    event.currentTarget.className += " active";
  }


  constructor() { }

  ngOnInit() {
  }

}
