import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-player-account-last-game-lol',
  templateUrl: './player-account-last-game-lol.component.html',
  styleUrls: ['./player-account-last-game-lol.component.css']
})
export class PlayerAccountLastGameLolComponent implements OnInit {
  gameId: string;

  public lastMatch = [{
    teamName:"No Name",
    losersTeamName:"No Name",
    losersTeamPoint:34,
    winnersTeamName:"No2 Name",
    winnersTeamPoint:56,
    nbKills:10,
    nbDeath:2,
    timeDeath:20,
    pseudo:"pseudo",
    champUsed:"Hecarim",
    job:"Jungler"
  },{
    teamName:"No Name",
    losersTeamName:"No Name",
    losersTeamPoint:34,
    winnersTeamName:"No2 Name",
    winnersTeamPoint:56,
    nbKills:20,
    nbDeath:4,
    pseudo:"pseudo",
    timeDeath:20,
    mostUseWeapon:"Ahri",
    job:"Mid"
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
