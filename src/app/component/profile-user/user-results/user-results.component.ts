import { Component, OnInit } from '@angular/core';
import {GameService} from "../../../../shared/services/game.service";
import {PlayerAccountService} from "../../../../shared/services/player-account.service";
import {Game} from "../../../../shared/models/game";
import {CoolLocalStorage} from "angular2-cool-storage";
import {Configuration} from "../../../../shared/app.constants";

@Component({
  selector: 'app-user-results',
  templateUrl: 'user-results.component.html',
  styleUrls: ['user-results.component.css'],
  providers:[PlayerAccountService,GameService,Configuration]
})
export class UserResultsComponent implements OnInit {
  localStorage: CoolLocalStorage;
  private userGames: Object;
  private games: Object;
  playerAccountGetByUserId: Object;


  constructor(private playerAccountServiceInstance: PlayerAccountService,
              private gameServiceInstance: GameService,
              localStorage: CoolLocalStorage) {
    this.localStorage = localStorage;
  }

  // Doughnut
  public RatioChartType:string = 'doughnut';
  public RatioLabels = [];
  public RatioData = [];
  public isPropertyLoaded:boolean = false;

  private displayWinRatioGraph(playerAccount:Object):any{
    let gamesProperties = [];
    let tabResponse = [];
    for(let g=0;g in playerAccount;g++){
      gamesProperties[g] = playerAccount[g].properties
    }

    for(let r=0; r in playerAccount;r++){
      this.RatioLabels[r] = [];
      this.RatioData[r] = [];
      tabResponse[r] = [];
      console.log("lol"+playerAccount[r]['properties'][0]);
      if(playerAccount[r].game._id == "569104a0417130681bcf1586"){//csgo
        this.RatioLabels[r].push("wins");
        this.RatioData[r].push(playerAccount[r]['properties'][0]['stats']['total_matches_won']);

        this.RatioLabels[r].push("losses");
        this.RatioData[r].push(playerAccount[r]['properties'][0]['stats']['total_matches_played'] - playerAccount[r]['properties'][0]['stats']['total_matches_won']);
      }
      if(playerAccount[r].game._id == "5a61e8d69fe0d61c36c54253"){//R6SIEGE
        this.RatioLabels[r].push("wins");
        this.RatioData[r].push(playerAccount[r]['properties'][0]['stats']['player']['stats']['casual']['wins']);

        this.RatioLabels[r].push("losses");
        this.RatioData[r].push(playerAccount[r]['properties'][0]['stats']['player']['stats']['casual']['losses']);
      }
      if(playerAccount[r].game._id == "586f56f5b9fde402faa33fdc"){//lol



        this.RatioLabels[r].push("wins");
        this.RatioData[r].push(playerAccount[r]['properties'][0]['league'][0]['wins']);

        this.RatioLabels[r].push("losses");
        this.RatioData[r].push(playerAccount[r]['properties'][0]['league'][0]['losses']);

      }
    }
    this.isPropertyLoaded = true;
  }

  private getPlayerAccountByUserID(idUser:string):any {
    this.playerAccountServiceInstance
      .GetSinglePlayerAccountByUserId(idUser)
      .subscribe(
        data => this.playerAccountGetByUserId = data,
        error => console.log(error),
        () => {
          console.log('get One Player Account by userId', this.playerAccountGetByUserId);
          this.displayWinRatioGraph(this.playerAccountGetByUserId);
        }
      );
  }


  private getUserGame(idUser: string, callback): any {
    this.gameServiceInstance
      .GetUserGames(idUser)
      .subscribe(
        data => this.userGames = data,
        error => {
          console.log(error);
          callback(null, error.message)
        },
        () => {
          //console.log('get user\'s games complete', this.userGames),
          callback(this.userGames, null)
        }
      );

  }

  private getGames(callback): any {
    this.gameServiceInstance
      .GetAllGames()
      .subscribe(
        data => this.games = data,
        error => {
          console.log(error),
            callback(null, error.message)
        },
        () => {
          //console.log('Add player account complete', this.games);
          callback(this.games, null);
        }
      );
  }

  ngOnInit() {
    let id = this.localStorage.getItem('userId');

    this.getPlayerAccountByUserID(id);

    this.getUserGame(id, (userGames: Game[], errorMessage: string): any => {
      //j'appelle tous les jeux pour les tests
      this.getGames((games: Game[], errorMessage: string): any => {
        if(userGames != null && games != null)
        {
          if(userGames.length > 0)
          {
            for(let i = 0; i<games.length; i++)
            {
              for(let j = 0; j<userGames.length; j++)
              {
                if(games[i]._id == userGames[j]._id)
                {
                  games.splice(i,1);
                }
              }
            }
          }
        }
      });
    });

  }

}
