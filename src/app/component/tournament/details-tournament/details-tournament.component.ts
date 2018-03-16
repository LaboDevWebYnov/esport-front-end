import * as _ from 'lodash';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { Configuration } from '../../../../shared/app.constants';
import { ToornamentService } from '../../../../shared/services/toornament.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-details-tournament',
  templateUrl: './details-tournament.component.html',
  styleUrls: ['./details-tournament.component.css'],
  providers: [Configuration, ToornamentService],
})
export class DetailsTournamentComponent implements OnInit {

  loclaStorage: CoolLocalStorage;
  game_id = "5a61e8d69fe0d61c36c54253";

  public tournament = {
    Name: "Tournois de test",
    Creator: "Joueur Random",
    Date: "30 Fevrier 2018",
    Plateform: "PC",
    Game: "Rocket League",
    TotalPlace: "32",
    PlaceLoked: "12",
  };

  public toornamentObj: object;
  public toornamentCountry: string;
  tournamentId: string;

  public changeOnglet(event, option): void {

    let tabLinks = document.getElementsByClassName("tablinks");
    _.each(tabLinks, function (link) {
      link.className = 'tablinks'
    })

    event.path[0].className = 'tablinks active';

    var id_content = option;
    document.querySelector('.content').innerHTML = document.getElementById(id_content).innerHTML;
  }


  constructor(private route: ActivatedRoute, private toornamentService: ToornamentService) {
  }

  ngOnInit() {
    this.tournamentId = this.route.snapshot.params['toornamentId']
    this.getParticipantsByToornaments(this.tournamentId);
    document.querySelector('.content').innerHTML = document.getElementById("informations").innerHTML
  }

  ngAfterContentInit(){
  }

  private getParticipantsByToornaments(tournamentid: string)
  {
    this.toornamentService.getTournamentById(tournamentid)
      .subscribe(
        data => this.toornamentObj = data,
        error => console.log(error),
        () => {
          this.toornamentCountry = this.toornamentObj.country.toLowerCase()
          console.log("on a get le tournois", this.toornamentObj);
        }
      );
  }
}
