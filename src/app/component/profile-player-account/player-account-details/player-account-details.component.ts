import {Component, OnInit} from '@angular/core';
import {GameService} from "../../../../shared/services/game.service";
import {PlayerAccountService} from "../../../../shared/services/player-account.service";
import {Configuration} from '../../../../shared/app.constants';
import {CoolLocalStorage} from "angular2-cool-storage";
import {ActivatedRoute} from "@angular/router";
import * as _ from 'lodash';


@Component({
  selector: 'app-player-account-details',
  templateUrl: './player-account-details.component.html',
  styleUrls: ['./player-account-details.component.css'],
  providers: [PlayerAccountService, GameService, Configuration]

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
    this.getPlayerAccountByUserIDByGameId(id, this.gameId);
    console.log("Game Id : " + this.gameId);
  }

  // Doughnut
  public RatioChartType: string = 'doughnut';
  public RatioLabels = [];
  public RatioData = [];
  public isPropertyRatioLoaded: boolean = false;

  public statsChartType: string = 'doughnut';
  public statsLabels = [];
  public statsData = [];
  public isPropertyStatsLoaded: boolean = false;

  public activityChartType: string = 'doughnut';
  public activityLabels = [];
  public activityData = [];
  public isPropertyActivityLoaded: boolean = false;

  public playerAccountProperty = [
    {
      isRatioLoaded: false,
      isStatsLoaded: false,
      isActivityLoaded: false,

      Case1: {
        loaded: false,
        value: "",
      },
      Case2: {
        loaded: false,
        value: "",
      },
      Case3: {
        loaded: false,
        value: "",
      },
      Case4: {
        loaded: false,
        value: "",
      },
      Case5: {
        loaded: false,
        value: "",
      },
      Case6: {
        loaded: false,
        value: "",
      },
    },
  ];


  private displayWinRatioGraph(playerAccount: Object, playerAccountNumber: number): any {
    let gamesProperties = playerAccount['properties'];
    let tabResponse = [];

    if (this.gameId == "569104a0417130681bcf1586") {//csgo
      tabResponse.push({
        propertyName: "total_matches_won",
        propertyToDisplay: "wins",
        value: 0
      });
      tabResponse.push({
        propertyName: "total_matches_played",
        propertyToDisplay: "losses",
        value: 0
      });
    }
    if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      tabResponse.push({
        propertyName: "wins",
        propertyToDisplay: "wins",
        value: 0
      });
      tabResponse.push({
        propertyName: "losses",
        propertyToDisplay: "losses",
        value: 0
      });
    }
    if (this.gameId == "586f56bfb9fde402faa33fdb") {//Rocket League
      tabResponse.push({
        propertyName: "none",
        propertyToDisplay: "none",
        value: 1
      });
      tabResponse.push({
        propertyName: "none",
        propertyToDisplay: "none",
        value: 1
      });
    }
    if (this.gameId == "583d85afe26ea010b06b801b") {//Overwatch
      tabResponse.push({
        propertyName: "wins",
        propertyToDisplay: "wins",
        value: 0
      });
      tabResponse.push({
        propertyName: "losses",
        propertyToDisplay: "losses",
        value: 0
      });
    }
    if (this.gameId == "586f56587c2b7302f311eaa5") {//Dota 2
      tabResponse.push({
        propertyName: "none",
        propertyToDisplay: "none",
        value: 1
      });
      tabResponse.push({
        propertyName: "none",
        propertyToDisplay: "none",
        value: 1
      });
    }

    for (let i = 0; i in gamesProperties; i++) {
      for (let o = 0; o in tabResponse; o++) {
        if (gamesProperties[i].propertyName == tabResponse[o].propertyName) {
          if (gamesProperties[i].propertyName == "total_matches_played") {
            let nbWin;
            for (let j = 0; j in gamesProperties; j++) {
              if (gamesProperties[j].propertyName == "total_matches_won") {
                nbWin = gamesProperties[j].value;
              }
            }
            tabResponse[o].value = gamesProperties[i].value - nbWin;
          }
          else {
            tabResponse[o].value = gamesProperties[i].value;
          }
        }
      }
    }


    this.RatioLabels[playerAccountNumber] = [];
    this.RatioData[playerAccountNumber] = [];

    console.log("Ratio info : ", tabResponse);

    for (let z = 0; z in tabResponse; z++) {
      this.RatioLabels[playerAccountNumber].push(tabResponse[z].propertyToDisplay);
      this.RatioData[playerAccountNumber].push(tabResponse[z].value);
    }


    this.playerAccountProperty[playerAccountNumber].isRatioLoaded = true;
  }

  private displayWinStatsGraph(playerAccount: Object, playerAccountNumber: number): any {
    let gamesProperties = playerAccount['properties'];
    let tabResponseStats = [];

    if (this.gameId == "569104a0417130681bcf1586") {//csgo
      tabResponseStats.push({
        propertyName: "total_kills",
        propertyToDisplay: "kills",
        value: 0
      });
      tabResponseStats.push({
        propertyName: "total_deaths",
        propertyToDisplay: "deaths",
        value: 0
      });
    }
    if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      tabResponseStats.push({
        propertyName: "kda_season",
        propertyToDisplay: "KDA",
        value: 0
      });
    }
    if (this.gameId == "586f56bfb9fde402faa33fdb") {//Rocket League
      tabResponseStats.push({
        propertyName: "none",
        value: 1
      });
      tabResponseStats.push({
        propertyName: "none",
        value: 1
      });
    }
    if (this.gameId == "583d85afe26ea010b06b801b") {//Overwatch
      tabResponseStats.push({
        propertyName: "wins",
        value: 0
      });
      tabResponseStats.push({
        propertyName: "losses",
        value: 0
      });
    }
    if (this.gameId == "586f56587c2b7302f311eaa5") {//Dota 2
      tabResponseStats.push({
        propertyName: "none",
        value: 1
      });
      tabResponseStats.push({
        propertyName: "none",
        value: 1
      });
    }

    for (let i = 0; i in gamesProperties; i++) {
      for (let o = 0; o in tabResponseStats; o++) {
        if (gamesProperties[i].propertyName == tabResponseStats[o].propertyName) {
          tabResponseStats[o].value = gamesProperties[i].value;
        }
      }
    }

    this.statsLabels[playerAccountNumber] = [];
    this.statsData[playerAccountNumber] = [];

    console.log("Stat info : ", tabResponseStats);

    for (let z = 0; z in tabResponseStats; z++) {
      if (tabResponseStats[z].propertyToDisplay == "KDA") {
        this.statsLabels[playerAccountNumber].push(tabResponseStats[z].value[0].propertyToDisplay);
        this.statsData[playerAccountNumber].push(tabResponseStats[z].value[0].value);
        this.statsLabels[playerAccountNumber].push(tabResponseStats[z].value[1].propertyToDisplay);
        this.statsData[playerAccountNumber].push(tabResponseStats[z].value[1].value);
        this.statsLabels[playerAccountNumber].push(tabResponseStats[z].value[2].propertyToDisplay);
        this.statsData[playerAccountNumber].push(tabResponseStats[z].value[2].value);
      }
      else {
        this.statsLabels[playerAccountNumber].push(tabResponseStats[z].propertyToDisplay);
        this.statsData[playerAccountNumber].push(tabResponseStats[z].value);
      }
    }

    this.playerAccountProperty[playerAccountNumber].isStatsLoaded = true;
  }

  private displayWinActivityGraph(playerAccount: Object, playerAccountNumber: number): any {
    let gamesProperties = playerAccount['properties'];
    let tabResponse = [];

    if (this.gameId == "569104a0417130681bcf1586") {//csgo
      tabResponse.push({
        propertyName: "total_rounds_played",
        propertyToDisplay: "rounds played",
        value: 0
      });
      tabResponse.push({
        propertyName: "total_mvps",
        propertyToDisplay: "number of mvps",
        value: 0
      });
    }
    if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      tabResponse.push({
        propertyName: "totalPentaKills",
        propertyToDisplay: "Penta Kills",
        value: 0
      });
      tabResponse.push({
        propertyName: "totalQuadraKills",
        propertyToDisplay: "Quadra Kills",
        value: 0
      });
      tabResponse.push({
        propertyName: "totalTripleKills",
        propertyToDisplay: "Triple Kills",
        value: 0
      });
      tabResponse.push({
        propertyName: "totalDoubleKills",
        propertyToDisplay: "Double Kills",
        value: 0
      });
    }
    if (this.gameId == "586f56bfb9fde402faa33fdb") {//Rocket League
      tabResponse.push({
        propertyName: "none",
        propertyToDisplay: "none",
        value: 1
      });
      tabResponse.push({
        propertyName: "none",
        propertyToDisplay: "none",
        value: 1
      });
    }
    if (this.gameId == "583d85afe26ea010b06b801b") {//Overwatch
      tabResponse.push({
        propertyName: "none",
        propertyToDisplay: "none",
        value: 0
      });
      tabResponse.push({
        propertyName: "none",
        propertyToDisplay: "none",
        value: 0
      });
    }
    if (this.gameId == "586f56587c2b7302f311eaa5") {//Dota 2
      tabResponse.push({
        propertyName: "none",
        propertyToDisplay: "none",
        value: 1
      });
      tabResponse.push({
        propertyName: "none",
        propertyToDisplay: "none",
        value: 1
      });
    }

    for (let i = 0; i in gamesProperties; i++) {
      for (let o = 0; o in tabResponse; o++) {
        if (gamesProperties[i].propertyName == "kda_season") {
          for (let h = 0; h < gamesProperties[i].value.length; h++) {
            if (gamesProperties[i].value[h].propertyName == tabResponse[o].propertyName) {
              tabResponse[o].value = gamesProperties[i].value[h].value;
            }
          }
        }
        if (gamesProperties[i].propertyName == tabResponse[o].propertyName) {
          tabResponse[o].value = gamesProperties[i].value;
        }
      }
    }

    this.activityLabels[playerAccountNumber] = [];
    this.activityData[playerAccountNumber] = [];

    console.log("Activity info : ", tabResponse);

    for (let z = 0; z in tabResponse; z++) {
      this.activityLabels[playerAccountNumber].push(tabResponse[z].propertyToDisplay);
      this.activityData[playerAccountNumber].push(tabResponse[z].value);
    }

    this.playerAccountProperty[playerAccountNumber].isActivityLoaded = true;
  }

  private getUserNamePlayerAccount(playerAccountNumber: number): any {
    let userName = "";
    if (this.gameId == "569104a0417130681bcf1586") {//cs go
      for (let x = 0; x in this.playerAccountGetByUserId[playerAccountNumber]['properties']; x++) {
        if (this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['propertyName'] == "pseudo") {
          userName = this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['value'];
        }
      }
      return userName;
    }
    else if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      return this.playerAccountGetByUserId[playerAccountNumber]['login'];
    }
  }

  private getWinRatePlayerAccount(playerAccountNumber: number): any {
    let winRate = 0;
    if (this.gameId == "569104a0417130681bcf1586") {//cs go
      let win = 0, played = 0;
      for (let x = 0; x in this.playerAccountGetByUserId[playerAccountNumber]['properties']; x++) {
        if (this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['propertyName'] == "total_matches_won") {
          win = this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['value'];
        }
        if (this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['propertyName'] == "total_matches_played") {
          played = this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['value'];
        }
      }
      return String(Math.floor(win / played * 100));
    }
    else if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      for (let x = 0; x in this.playerAccountGetByUserId[playerAccountNumber]['properties']; x++) {
        if (this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['propertyName'] == "win_ratio") {
          winRate = this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['value'];
        }
      }
      return String(Math.floor(winRate * 100));
    }
    return null;
  }


  private getTimePlayedCSGO(playerAccountNumber: number): any {
    let timePlayed;
    if (this.gameId == "569104a0417130681bcf1586") {//cs go
      for (let x = 0; x in this.playerAccountGetByUserId[playerAccountNumber]['properties']; x++) {
        if (this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['propertyName'] == "total_time_played") {
          timePlayed = Math.floor(this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['value'] / 3600) + "h";
        }
      }
      return timePlayed;
    }
    return null;
  }

  private getHeadShotPercentageCSGO(playerAccountNumber: number): any {
    if (this.gameId == "569104a0417130681bcf1586") {//cs go
      let kills = 0, headshot = 0;
      for (let x = 0; x in this.playerAccountGetByUserId[playerAccountNumber]['properties']; x++) {
        if (this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['propertyName'] == "total_kills") {
          kills = this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['value'];
        }
        if (this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['propertyName'] == "total_kills_headshot") {
          headshot = this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['value'];
        }
      }
      return Math.floor(headshot / kills * 100);
    }
    return null;
  }

  private getAccuracyCSGO(playerAccountNumber: number): any {
    if (this.gameId == "569104a0417130681bcf1586") {//cs go
      let hit = 0, fire = 0;
      for (let x = 0; x in this.playerAccountGetByUserId[playerAccountNumber]['properties']; x++) {
        if (this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['propertyName'] == "total_shots_hit") {
          hit = this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['value'];
        }
        if (this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['propertyName'] == "total_shots_fired") {
          fire = this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['value'];
        }
      }
      return Math.floor(hit / fire * 100);
    }
    return null;
  }

  private getMVPSCSGO(playerAccountNumber: number): any {
    if (this.gameId == "569104a0417130681bcf1586") {//cs go
      for (let x = 0; x in this.playerAccountGetByUserId[playerAccountNumber]['properties']; x++) {
        if (this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['propertyName'] == "total_mvps") {
          return this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['value'];
        }
      }
    }
    return null;
  }


  private getRankLOL(playerAccountNumber: number): any {
    let rank;
    if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      for (let x = 0; x in this.playerAccountGetByUserId[playerAccountNumber]['properties']; x++) {
        if (this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['propertyName'] == "league") {
          rank = this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['value'];
        }
      }
      return rank;
    }
    return null;
  }

  private getLeaguePointLOL(playerAccountNumber: number): any {
    if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      for (let x = 0; x in this.playerAccountGetByUserId[playerAccountNumber]['properties']; x++) {
        if (this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['propertyName'] == "league_point") {
          return this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['value'];
        }
      }
    }
    return null;
  }

  private getLeagueNameLOL(playerAccountNumber: number): any {
    if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      for (let x = 0; x in this.playerAccountGetByUserId[playerAccountNumber]['properties']; x++) {
        if (this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['propertyName'] == "league_name") {
          return this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['value'];
        }
      }
    }
    return null;
  }

  private getTotalMinionKillsLOL(playerAccountNumber: number): any {
    if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      for (let x = 0; x in this.playerAccountGetByUserId[playerAccountNumber]['properties']; x++) {
        if (this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['propertyName'] == "kda_season") {
          for (let r = 0; r in this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['value']; r++) {
            if (this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['value'][r]['propertyName'] == "totalMinionKills") {
              return this.playerAccountGetByUserId[playerAccountNumber]['properties'][x]['value'][r]['value'];
            }
          }
        }
      }
    }
    return null;
  }

  private getPlayerAccountByUserIDByGameId(idUser: string, gameId: string): any {
    this.playerAccountServiceInstance
      .GetPlayerAccountByUserIdByGame(idUser, gameId)
      .subscribe(
        data => this.playerAccountGetByUserId = data,
        error => console.log(error),
        () => {
          console.log('get One Player Account by userId', this.playerAccountGetByUserId);
          for (let d = 0; d in this.playerAccountGetByUserId; d++) {
            console.log("Player Account " + d + " : ", this.playerAccountGetByUserId[d]);
            this.playerAccountProperty[d] = {
              isRatioLoaded: false,
              isStatsLoaded: false,
              isActivityLoaded: false,

              Case1: {
                loaded: false,
                value: "",
              },
              Case2: {
                loaded: false,
                value: "",
              },
              Case3: {
                loaded: false,
                value: "",
              },
              Case4: {
                loaded: false,
                value: "",
              },
              Case5: {
                loaded: false,
                value: "",
              },
              Case6: {
                loaded: false,
                value: "",
              },
            };
            this.displayWinRatioGraph(this.playerAccountGetByUserId[d], d);
            this.displayWinStatsGraph(this.playerAccountGetByUserId[d], d);
            this.displayWinActivityGraph(this.playerAccountGetByUserId[d], d);

            this.playerAccountProperty[d].Case1.value = this.getUserNamePlayerAccount(d); // Good

            this.playerAccountProperty[d].Case2.value = "NONE";
            this.playerAccountProperty[d].Case3.value = "NONE";

            this.playerAccountProperty[d].Case4.value = "Win : " + this.getWinRatePlayerAccount(d) + "%"; // Good

            if (this.gameId == "569104a0417130681bcf1586") {//cs go
              this.playerAccountProperty[d].Case5.value = "Accuracy : " + this.getAccuracyCSGO(d) + "%"; // Good
              this.playerAccountProperty[d].Case6.value = "Time Played : " + this.getTimePlayedCSGO(d); // Good
              this.playerAccountProperty[d].Case2.value = "Head Shot : " + this.getHeadShotPercentageCSGO(d) + "%"; // Good
              this.playerAccountProperty[d].Case3.value = "MVPS : " + this.getMVPSCSGO(d);
            }
            if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
              this.playerAccountProperty[d].Case2.value = "Total Minion Kills : " + this.getTotalMinionKillsLOL(d);
              this.playerAccountProperty[d].Case3.value = "League Name : " + this.getLeagueNameLOL(d);
              this.playerAccountProperty[d].Case5.value = "League Point : " + this.getLeaguePointLOL(d); // Good
              this.playerAccountProperty[d].Case6.value = this.getRankLOL(d); // Good
            }

            for (let u = 1; u < 7; u++) {
              if (!_.isEmpty(this.playerAccountProperty[d]['Case' + u].value) && !_.isNull(this.playerAccountProperty[d]['Case' + u].value)) {
                this.playerAccountProperty[d]['Case' + u].loaded = true;
              }
            }

            // this.getWinRatePlayerAccount(d);
            // this.getTimePlayedOrRank(d);
            // this.getUserNamePlayerAccount(d);

          }
        }
      );
  }

  // events
  public chartClicked(e: any): void {
    //console.log(e);
  }

  public chartHovered(e: any): void {
    //console.log(e);
  }

}
