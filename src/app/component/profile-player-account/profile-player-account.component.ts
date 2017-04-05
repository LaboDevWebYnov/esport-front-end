import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profile-player-account',
  templateUrl: './profile-player-account.component.html',
  styleUrls: ['./profile-player-account.component.css']
})
export class ProfilePlayerAccountComponent implements OnInit {
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
