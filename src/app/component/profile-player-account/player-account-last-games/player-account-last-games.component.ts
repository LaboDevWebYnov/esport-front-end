import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-player-account-last-games',
  templateUrl: './player-account-last-games.component.html',
  styleUrls: ['./player-account-last-games.component.css']
})
export class PlayerAccountLastGamesComponent implements OnInit {
  gameId: string;

  public lastMatch = [{
    teamName:"No Name",
    losersTeamName:"No Name",
    losersTeamPoint:10,
    winnersTeamName:"No2 Name",
    winnersTeamPoint:16,
    nbKills:10,
    nbDeath:2,
    timeDeath:20,
    pseudo:"pseudo",
    mostUseWeapon:"AWP",
    job:"Entry Fragger"
  },{
    teamName:"No Name",
    losersTeamName:"No Name",
    losersTeamPoint:10,
    winnersTeamName:"No2 Name",
    winnersTeamPoint:16,
    nbKills:20,
    nbDeath:4,
    pseudo:"pseudo",
    timeDeath:20,
    mostUseWeapon:"m4a4",
    job:"Entry Fragger"
  }];

  constructor(private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit() {
    this.gameId = this.route.snapshot.params['gameId'];
    console.log(this.gameId);
  }

  public gotoProfile() : void {
    this.router.navigate(['/profile']);
  }

}
