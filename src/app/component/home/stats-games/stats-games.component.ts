import { Component, OnInit } from '@angular/core';
import {PlayerAccountService} from '../../../../shared/services/player-account.service';
import {TeamService} from '../../../../shared/services/team.service';

@Component({
  selector: 'app-stats-games',
  templateUrl: './stats-games.component.html',
  styleUrls: ['./stats-games.component.css'],
  providers: [PlayerAccountService, TeamService]
})
export class StatsGamesComponent implements OnInit {

  public PlayerAccountsCs: Object;
  private PlayerAccountsLol: Object;
  private TeamsById: Object;
  constructor( private playerAccountServiceInstance: PlayerAccountService, private teamsServiceInstance: TeamService) {

  }

  ngOnInit() {
    let gamesId = {
      'cs': '569104a0417130681bcf1586',
      'lol': '586f56f5b9fde402faa33fdc',
      'overwatch': '583d85afe26ea010b06b801b',
      'dota': '586f56587c2b7302f311eaa5',
      'rocketLeague': '586f56bfb9fde402faa33fdb',
    };
    this.getPlayerAccounts(gamesId['cs']);
    this.getTeamByIdGame(gamesId['cs']);

  }

  private getPlayerAccounts(GameId: string): void {
    if (GameId = '569104a0417130681bcf1586') {
      this.playerAccountServiceInstance
        .GetPlayerAccountsByGameCount(GameId)
        .subscribe(
          data => this.PlayerAccountsCs = data,
          error => console.log(error),
          () =>  {
            console.log('get all playerAccounts CS complete', this.PlayerAccountsCs);
          }
        );
    }
    /*if (GameId = '586f56f5b9fde402faa33fdc') {
      this.playerAccountServiceInstance
        .GetPlayerAccountByGame(GameId)
        .subscribe(
          data => this.PlayerAccountsLol = data,
          error => console.log(error),
          () =>  {
            console.log('gat all playerAccounts CS complete', this.PlayerAccountsLol);
          }
        );
    }*/
  }

  private getTeamByIdGame (GameId: string): void {
    this.teamsServiceInstance
      .GetTeamsByGameId(GameId)
      .subscribe(
        data => this.TeamsById = data.length,
        error => console.log(error),
        () => {
          console.log('get all Teams complete', this.TeamsById);
        }
      );
  }
}
