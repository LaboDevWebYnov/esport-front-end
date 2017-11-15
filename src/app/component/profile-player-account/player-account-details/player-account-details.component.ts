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
    console.log("User id : " + id);

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
    this.RatioLabels[playerAccountNumber] = [];
    this.RatioData[playerAccountNumber] = [];

    if (this.gameId == "569104a0417130681bcf1586") {//csgo
      this.RatioLabels[playerAccountNumber].push("wins");
      this.RatioData[playerAccountNumber].push(this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['stats']['total_matches_won']);
      this.RatioLabels[playerAccountNumber].push("losses");
      this.RatioData[playerAccountNumber].push(this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['stats']['total_matches_played'] - this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['stats']['total_matches_won']);
    }
    if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      this.RatioLabels[playerAccountNumber].push("wins");
      this.RatioData[playerAccountNumber].push(this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['infos']['wins']);
      this.RatioLabels[playerAccountNumber].push("losses");
      this.RatioData[playerAccountNumber].push(this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['infos']['losses']);
    }
    this.playerAccountProperty[playerAccountNumber].isRatioLoaded = true;
  }

  private displayWinStatsGraph(playerAccount: Object, playerAccountNumber: number): any {
    this.statsLabels[playerAccountNumber] = [];
    this.statsData[playerAccountNumber] = [];

    if (this.gameId == "569104a0417130681bcf1586") {//csgo
      this.statsLabels[playerAccountNumber].push("deaths");
      this.statsData[playerAccountNumber].push(this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['stats']['total_deaths']);
      this.statsLabels[playerAccountNumber].push("kills");
      this.statsData[playerAccountNumber].push(this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['stats']['total_kills']);
    }
    if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      this.statsLabels[playerAccountNumber].push("deaths");
      this.statsData[playerAccountNumber].push(this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['kda']['total_deaths']);
      this.statsLabels[playerAccountNumber].push("kills");
      this.statsData[playerAccountNumber].push(this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['kda']['total_kills']);
      this.statsLabels[playerAccountNumber].push("assists");
      this.statsData[playerAccountNumber].push(this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['kda']['total_assists']);
    }

    this.playerAccountProperty[playerAccountNumber].isStatsLoaded = true;
  }

  private displayWinActivityGraph(playerAccount: Object, playerAccountNumber: number): any {
    this.activityLabels[playerAccountNumber] = [];
    this.activityData[playerAccountNumber] = [];

    if (this.gameId == "569104a0417130681bcf1586") {//csgo
      this.activityLabels[playerAccountNumber].push("rounds played");
      this.activityData[playerAccountNumber].push(this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['stats']['total_rounds_played']);
      this.activityLabels[playerAccountNumber].push("number of mvps");
      this.activityData[playerAccountNumber].push(this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['stats']['total_mvps']);
    }
    if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      this.activityLabels[playerAccountNumber].push("Number Of Double Kills");
      this.activityData[playerAccountNumber].push(this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['kda']['total_double_kills']);
      this.activityLabels[playerAccountNumber].push("Number Of Triple Kills");
      this.activityData[playerAccountNumber].push(this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['kda']['total_triple_kills']);
      this.activityLabels[playerAccountNumber].push("Number Of Quadra Kills");
      this.activityData[playerAccountNumber].push(this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['kda']['total_quadra_kills']);
      this.activityLabels[playerAccountNumber].push("Number Of Penta Kills");
      this.activityData[playerAccountNumber].push(this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['kda']['total_penta_kills']);
    }
    this.playerAccountProperty[playerAccountNumber].isActivityLoaded = true;
  }


  private getUserNamePlayerAccount(playerAccountNumber: number): any {
    if (this.gameId == "569104a0417130681bcf1586") {//cs go
      return this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['userInfo']['pseudo'];
    }
    else if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      return this.playerAccountGetByUserId[playerAccountNumber]['login'];
    }
  }

  private getWinRatePlayerAccount(playerAccountNumber: number): any {
    let winRate = 0;
    if (this.gameId == "569104a0417130681bcf1586") {//cs go
      let win = 0, played = 0;
      win = this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['stats']['total_matches_won'];
      played = this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['stats']['total_matches_played'];
      return String(Math.floor(win / played * 100));
    }
    else if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      winRate = this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['infos']['win_ratio'];
      return String(Math.floor(winRate * 100));
    }
    return null;
  }

  private getTimePlayedCSGO(playerAccountNumber: number): any {
    let timePlayed;
    if (this.gameId == "569104a0417130681bcf1586") {//cs go
      timePlayed = Math.floor(this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['stats']['total_time_played'] / 3600) + "h";
      return timePlayed;
    }
    return null;
  }

  private getHeadShotPercentageCSGO(playerAccountNumber: number): any {
    if (this.gameId == "569104a0417130681bcf1586") {//cs go
      let kills = 0, headshot = 0;
      kills = this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['stats']['total_kills'];
      headshot = this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['stats']['total_kills_headshot'];
      return Math.floor(headshot / kills * 100);
    }
    return null;
  }

  private getAccuracyCSGO(playerAccountNumber: number): any {
    if (this.gameId == "569104a0417130681bcf1586") {//cs go
      let hit = 0, fire = 0;
      hit = this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['stats']['total_shots_hit'];
      fire = this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['stats']['total_shots_fired'];
      return Math.floor(hit / fire * 100);
    }
    return null;
  }

  private getMVPSCSGO(playerAccountNumber: number): any {
    if (this.gameId == "569104a0417130681bcf1586") {//cs go
      return this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['stats']['total_mvps'];
    }
    return null;
  }


  private getRankLOL(playerAccountNumber: number): any {
    let rank;
    if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      rank = this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['infos']['league'];
      return rank;
    }
    return null;
  }

  private getLeaguePointLOL(playerAccountNumber: number): any {
    if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      return this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['infos']['league_point'];
    }
    return null;
  }

  private getLeagueNameLOL(playerAccountNumber: number): any {
    if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      return this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['infos']['league_point'];
    }
    return null;
  }

  private getTotalMinionKillsLOL(playerAccountNumber: number): any {
    if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      return this.playerAccountGetByUserId[playerAccountNumber]['properties'][0]['kda']['total_minions_kills'];
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
