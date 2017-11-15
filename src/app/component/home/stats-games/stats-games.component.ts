import { Component, OnInit } from '@angular/core';
import {PlayerAccountService} from '../../../../shared/services/player-account.service';

@Component({
  selector: 'app-stats-games',
  templateUrl: './stats-games.component.html',
  styleUrls: ['./stats-games.component.css'],
  providers: [PlayerAccountService]
})
export class StatsGamesComponent implements OnInit {

  private PlayerAccounts: Object;
  constructor( private playerAccountServiceInstance: PlayerAccountService) {

  }

  ngOnInit() {
    let gameId = '569104a0417130681bcf1586';
    this.getPlayerAccounts(gameId);
  }

  private getPlayerAccounts(GameId: string): void {
    this.playerAccountServiceInstance
      .GetPlayerAccountByGame(GameId)
      .subscribe(
        data => this.PlayerAccounts = data,
        error => console.log(error),
        () =>  {
          console.log('gat all playerAccounts complete', this.PlayerAccounts);
        }
      );
  }
}
