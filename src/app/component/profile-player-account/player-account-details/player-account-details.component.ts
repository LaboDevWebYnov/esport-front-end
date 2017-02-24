import { Component, OnInit } from '@angular/core';
import {GameService} from "../../../../shared/services/game.service";
import {PlayerAccountService} from "../../../../shared/services/player-account.service";
import { Configuration } from '../../../../shared/app.constants';
import {CoolLocalStorage} from "angular2-cool-storage";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-player-account-details',
  templateUrl: './player-account-details.component.html',
  styleUrls: ['./player-account-details.component.css'],
  providers:[PlayerAccountService,GameService,Configuration]

})
export class PlayerAccountDetailsComponent implements OnInit {
  localStorage: CoolLocalStorage;
  playerAccountGetByUserId: Object;
  gameId: string;

  constructor(private playerAccountServiceInstance: PlayerAccountService,
              private route: ActivatedRoute,
              private gameServiceInstance: GameService,
              localStorage: CoolLocalStorage) {
    this.localStorage = localStorage;
  }

  ngOnInit() {
    let id = this.localStorage.getItem('userId');
    this.gameId = this.route.snapshot.params['gameId'];
    this.getPlayerAccountByUserID(id);
    console.log(this.gameId);
  }

  // Doughnut
  public RatioChartType:string = 'doughnut';
  public RatioLabels = [];
  public RatioData = [];
  public isPropertyRatioLoaded:boolean = false;

  public statsChartType:string = 'doughnut';
  public statsLabels = [];
  public statsData = [];
  public isPropertyStatsLoaded:boolean = false;

  public activityChartType:string = 'doughnut';
  public activityLabels = [];
  public activityData = [];
  public isPropertyActivityLoaded:boolean = false;


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

    this.isPropertyRatioLoaded = true;
  }

  private displayWinStatsGraph(playerAccount:Object):any{
    let gamesProperties = [];
    let tabResponseStats = [];
    for(let g=0;g in playerAccount;g++){
      gamesProperties[g] = playerAccount[g].properties
    }

    for(let r=0; r in playerAccount;r++){
      tabResponseStats[r] = [];
      if(playerAccount[r].game._id == "569104a0417130681bcf1586"){//csgo
        tabResponseStats[r].push({
          propertyName : "total_kills",
          propertyToDisplay : "kills",
          value : 0
        });
        tabResponseStats[r].push({
          propertyName : "total_deaths",
          propertyToDisplay : "deaths",
          value : 0
        });
      }
      if(playerAccount[r].game._id == "586f56f5b9fde402faa33fdc"){//lol
        tabResponseStats[r].push({
          propertyName : "total_kills",
          propertyToDisplay : "kills",
          value : 0
        });
        tabResponseStats[r].push({
          propertyName : "total_deaths",
          propertyToDisplay : "deaths",
          value : 0
        });
        tabResponseStats[r].push({
          propertyName : "total_assists",
          propertyToDisplay : "assists",
          value : 0
        });
      }
      if(playerAccount[r].game._id == "586f56bfb9fde402faa33fdb"){//Rocket League
        tabResponseStats[r].push({
          propertyName : "none",
          value : 1
        });
        tabResponseStats[r].push({
          propertyName : "none",
          value : 1
        });
      }
      if(playerAccount[r].game._id == "583d85afe26ea010b06b801b"){//Overwatch
        tabResponseStats[r].push({
          propertyName : "wins",
          value : 0
        });
        tabResponseStats[r].push({
          propertyName : "losses",
          value : 0
        });
      }
      if(playerAccount[r].game._id == "586f56587c2b7302f311eaa5"){//Dota 2
        tabResponseStats[r].push({
          propertyName : "none",
          value : 1
        });
        tabResponseStats[r].push({
          propertyName : "none",
          value : 1
        });
      }
    }

    for(let p=0; p in gamesProperties; p++){
      for(let i=0;i in gamesProperties[p];i++){
        for(let o=0;o in tabResponseStats[p];o++){
          if(gamesProperties[p][i].propertyName == tabResponseStats[p][o].propertyName){
            tabResponseStats[p][o].value = gamesProperties[p][i].value;

          }
        }
      }
    }

    for(let h=0;h in playerAccount;h++){
      this.statsLabels[h] = [];
      this.statsData[h] = [];

      for(let z=0;z in tabResponseStats[h]; z++){
        this.statsLabels[h].push(tabResponseStats[h][z].propertyToDisplay);
        this.statsData[h].push(tabResponseStats[h][z].value);
      }
    }

    this.isPropertyStatsLoaded = true;
  }

  private displayWinActivityGraph(playerAccount:Object):any{
    let gamesProperties = [];
    let tabResponse = [];
    for(let g=0;g in playerAccount;g++){
      gamesProperties[g] = playerAccount[g].properties
    }

    for(let r=0; r in playerAccount;r++){
      tabResponse[r] = [];
      if(playerAccount[r].game._id == "569104a0417130681bcf1586"){//csgo
        tabResponse[r].push({
          propertyName : "total_rounds_played",
          propertyToDisplay : "rounds played",
          value : 0
        });
        tabResponse[r].push({
          propertyName : "total_mvps",
          propertyToDisplay : "number of mvps",
          value : 0
        });
      }
      if(playerAccount[r].game._id == "586f56f5b9fde402faa33fdc"){//lol
        tabResponse[r].push({
          propertyName : "none",
          propertyToDisplay : "none",
          value : 0
        });
        tabResponse[r].push({
          propertyName : "none",
          propertyToDisplay : "none",
          value : 0
        });
        tabResponse[r].push({
          propertyName : "none",
          propertyToDisplay : "none",
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
          propertyName : "none",
          propertyToDisplay : "none",
          value : 0
        });
        tabResponse[r].push({
          propertyName : "none",
          propertyToDisplay : "none",
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

    for(let p=0; p in gamesProperties; p++){
      for(let i=0;i in gamesProperties[p];i++){
        for(let o=0;o in tabResponse[p];o++){
          if(gamesProperties[p][i].propertyName == tabResponse[p][o].propertyName){
            tabResponse[p][o].value = gamesProperties[p][i].value;
          }
        }
      }
    }


    for(let h=0;h in playerAccount;h++){
      this.activityLabels[h] = [];
      this.activityData[h] = [];

      for(let z=0;z in tabResponse[h]; z++){
        this.activityLabels[h].push(tabResponse[h][z].propertyToDisplay);
        this.activityData[h].push(tabResponse[h][z].value);
      }
    }

    this.isPropertyActivityLoaded = true;
  }

  private getPlayerAccountByUserID(idUser:string):any {
    this.playerAccountServiceInstance
      .GetSinglePlayerAccountByUserId(idUser)
      .subscribe(
        data => this.playerAccountGetByUserId = data,
        error => console.log(error),
        () => {
          console.log('get One Player Account by userId',this.playerAccountGetByUserId);
          this.displayWinRatioGraph(this.playerAccountGetByUserId);
          this.displayWinStatsGraph(this.playerAccountGetByUserId);
          this.displayWinActivityGraph(this.playerAccountGetByUserId);
        }
      );
  }

  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }

}
