import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../../../../shared/services/game.service";
import {PlayerAccountService} from "../../../../shared/services/player-account.service";
import {Configuration} from '../../../../shared/app.constants';
import {CoolLocalStorage} from "angular2-cool-storage";
import {PlayerAccount} from "../../../../shared/models/player-account";

@Component({
  selector: 'app-player-account-last-games',
  templateUrl: './player-account-last-games.component.html',
  styleUrls: ['./player-account-last-games.component.css'],
  providers: [PlayerAccountService, GameService, Configuration]
})
export class PlayerAccountLastGamesComponent implements OnInit, OnDestroy {
  localStorage: CoolLocalStorage;
  playerAccount: Object;
  gameId: string;
  private sub: any;
  private playerAccountId;

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

    this.sub = this.route.params.subscribe(params => {
      this.playerAccountId = params['playerAccountId'];

      console.log(this.playerAccountId);
    this.gameId = this.localStorage.getItem('gameId');
    console.log(this.gameId);
    let id = this.localStorage.getItem('userId');
    this.getPlayerAccountById(this.playerAccountId)
    });
  }

  ngOnDestroy()
  {
    this.sub.unsubscribe();
  }

  public gotoProfile() : void {
    this.router.navigate(['/profile']);
  }

  private getPlayerAccountById(playerAccountId: string): any {
    this.playerAccountServiceInstance
      .GetSinglePlayerAccountById(playerAccountId)
      .subscribe(
        data => this.playerAccount = data,
        error => console.log(error),
        () => {
          console.log('get One Player Account just PAAAA', this.playerAccount["properties"][0].stats);

        }
      );
  }

}
