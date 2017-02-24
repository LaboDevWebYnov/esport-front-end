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
      tabResponse[r] = [];
      if(playerAccount[r].game._id == "569104a0417130681bcf1586"){//csgo
        tabResponse[r].push({
          propertyName : "total_matches_won",
          propertyToDisplay : "wins",
          value : 0
        });
        tabResponse[r].push({
          propertyName : "total_matches_played",
          propertyToDisplay : "losses",
          value : 0
        });
      }
      if(playerAccount[r].game._id == "586f56f5b9fde402faa33fdc"){//lol
        tabResponse[r].push({
          propertyName : "wins",
          propertyToDisplay : "wins",
          value : 0
        });
        tabResponse[r].push({
          propertyName : "losses",
          propertyToDisplay : "losses",
          value : 0
        });
      }
      if(playerAccount[r].game._id == "586f56bfb9fde402faa33fdb"){//Rocket League
        tabResponse[r].push({
          propertyName : "none",
          propertyToDisplay : "none",
          value : 1
        });
        tabResponse[r].push({
          propertyName : "none",
          propertyToDisplay : "none",
          value : 1
        });
      }
      if(playerAccount[r].game._id == "583d85afe26ea010b06b801b"){//Overwatch
        tabResponse[r].push({
          propertyName : "wins",
          propertyToDisplay : "wins",
          value : 0
        });
        tabResponse[r].push({
          propertyName : "losses",
          propertyToDisplay : "losses",
          value : 0
        });
      }
      if(playerAccount[r].game._id == "586f56587c2b7302f311eaa5"){//Dota 2
        tabResponse[r].push({
          propertyName : "none",
          propertyToDisplay : "none",
          value : 1
        });
        tabResponse[r].push({
          propertyName : "none",
          propertyToDisplay : "none",
          value : 1
        });
      }
    }

    console.log(gamesProperties);
    console.log(tabResponse);

    for(let p=0; p in gamesProperties; p++){
      for(let i=0;i in gamesProperties[p];i++){
        for(let o=0;o in tabResponse[p];o++){
          if(gamesProperties[p][i].propertyName == tabResponse[p][o].propertyName){
            if(gamesProperties[p][i].propertyName == "total_matches_played"){
              let nbWin;
              for(let j=0;j in gamesProperties[p];j++){
                if(gamesProperties[p][j].propertyName == "total_matches_won"){
                  nbWin = gamesProperties[p][j].value;
                }
              }
              tabResponse[p][o].value = gamesProperties[p][i].value - nbWin;
            }
            else{
              tabResponse[p][o].value = gamesProperties[p][i].value;
            }
          }
        }
      }
    }


    for(let h=0;h in playerAccount;h++){
      this.RatioLabels[h] = [];
      this.RatioData[h] = [];

      for(let z=0;z in tabResponse[h]; z++){
        this.RatioLabels[h].push(tabResponse[h][z].propertyToDisplay);
        this.RatioData[h].push(tabResponse[h][z].value);
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
