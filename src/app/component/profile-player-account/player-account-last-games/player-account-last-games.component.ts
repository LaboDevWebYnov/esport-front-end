import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../../../../shared/services/game.service";
import {PlayerAccountService} from "../../../../shared/services/player-account.service";
import {Configuration} from '../../../../shared/app.constants';
import {CoolLocalStorage} from "angular2-cool-storage";

@Component({
  selector: 'app-player-account-last-games',
  templateUrl: './player-account-last-games.component.html',
  styleUrls: ['./player-account-last-games.component.css'],
  providers: [PlayerAccountService, GameService, Configuration]
})
export class PlayerAccountLastGamesComponent implements OnInit {
  localStorage: CoolLocalStorage;
  playerAccount: Object;
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
              private router: Router,private playerAccountServiceInstance: PlayerAccountService,private gameServiceInstance: GameService,
              localStorage: CoolLocalStorage) {
    this.localStorage = localStorage;
  }

  ngOnInit() {
    this.gameId = this.route.snapshot.params['gameId'];
    console.log(this.gameId);
    let id = this.localStorage.getItem('userId');
    this.getPlayerAccount(id,this.gameId)
  }

  public gotoProfile() : void {
    this.router.navigate(['/profile']);
  }

  private getPlayerAccount(idUser: string, gameId: string): any {
    this.playerAccountServiceInstance
      .GetPlayerAccountByUserIdByGame(idUser, gameId)
      .subscribe(
        data => this.playerAccount = data,
        error => console.log(error),
        () => {
          console.log('get One Player Account just PA', this.playerAccount[0].properties[0].stats);

        }
      );
  }

}
