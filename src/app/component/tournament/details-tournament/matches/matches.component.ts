import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ToornamentService } from '../../../../../shared/services/toornament.service';
import {ActivatedRoute} from "@angular/router";
import * as _ from 'lodash';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
  providers: [ToornamentService],
})
export class MatchesComponent implements OnInit {


  public matchIncome = [
    {
      joueur1 : "Sylvain",
      joueur2 : "Alexandre",
    },
    {
      joueur1 : "Clément",
      joueur2 : "Maxence",
    },

  ];

  public matchPass = [
    {
      joueur1 : "Sylvain",
      score1: "7",
      joueur2 : "Alexandre",
      score2 : "5"
    },
    {
      joueur1 : "Clément",
      score1 : "10",
      joueur2 : "Maxence",
      score2 : "0"
    },

  ];

  public matchesObj : object;
  tournamentId : string;

  constructor(private route: ActivatedRoute, private toornamentService: ToornamentService) { }

  ngOnInit() {
    this.tournamentId = this.route.snapshot.params['toornamentId'];
    this.getMatchesByTournament(this.tournamentId);

  }

  private getMatchesByTournament(tournamentid : string){
    this.toornamentService.getMatchesByTournament(tournamentid, [])
      .subscribe(
        data => this.matchesObj = data,
        error => console.log(error),
        () => {
          console.log("on a get les matches", this.matchesObj)
        }
      );
  }

}
