import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class PlayerAccountDetailsComponent implements OnInit, OnDestroy {
  localStorage: CoolLocalStorage;
  playerAccountGetByUserId: Object;
  playerAccount: Object;
gameId: string;
  private sub: any;
private playerAccountId;
  constructor(private playerAccountServiceInstance: PlayerAccountService,
              private route: ActivatedRoute,
              private gameServiceInstance: GameService,
              localStorage: CoolLocalStorage) {
    this.localStorage = localStorage;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.playerAccountId = params['playerAccountId'];

    let id = this.localStorage.getItem('userId');

    this.gameId = this.localStorage.getItem('gameId');
    this.getPlayerAccount(this.playerAccountId);
    this.getPlayerAccountByUserIDByGameId(this.playerAccountId);
    console.log("PlayerAccountId" + this.playerAccountId);
    console.log("Game Id : " + this.gameId);
    console.log("User id : " + id);

    });


  }
  ngOnDestroy()
  {
    this.sub.unsubscribe();
  }

  private getPlayerAccount(paId: string): void {
    this.playerAccountServiceInstance
      .GetSinglePlayerAccountById(paId)
      .subscribe(
        data => this.playerAccount = data,
        error => console.log(error),
        () => {
          console.log('get One Player Account just PA', this.playerAccount);

        }
      );
  }
  public changeOnglet(event, option): void {
    let i, tabContent, tabLinks;

    tabContent = document.getElementsByClassName("content");
    for (i = 0; i < tabContent.length; i++) {
      (<HTMLInputElement>tabContent[i]).style.display = "none";
    }

    tabLinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tabLinks.length; i++) {
      (<HTMLInputElement>tabLinks[i]).className = tabLinks[i].className.replace(" active", "");
    }

    (<HTMLInputElement>document.getElementById(option)).style.display = "block";
    event.currentTarget.className += " active";
  }

  // Doughnut
  public RatioChartType: string = 'doughnut';
  public RatioLabels = [];
  public RatioData = [];
  public RatioChartOption:any = {
    responsive: false
  };
  public RatioChartColor: any[] = [{backgroundColor: ["#2b6c98","#a4465a"]}];
  public isPropertyRatioLoaded: boolean = false;

  public statsChartType: string = 'doughnut';
  public statsLabels = [];
  public statsData = [];
  public statsChartOption:any = {
    responsive: false
  };
  public isPropertyStatsLoaded: boolean = false;

  public activityChartType: string = 'doughnut';
  public activityLabels = [];
  public activityData = [];
  public activityChartOption:any = {
    responsive: false
  };
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
      Case7: {
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
      this.RatioData[playerAccountNumber].push(this.playerAccountGetByUserId['properties'][0]['stats']['total_matches_won']);
      this.RatioLabels[playerAccountNumber].push("losses");
      this.RatioData[playerAccountNumber].push(this.playerAccountGetByUserId['properties'][0]['stats']['total_matches_played'] - this.playerAccountGetByUserId['properties'][0]['stats']['total_matches_won']);
    }
    if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      this.RatioLabels[playerAccountNumber].push("wins");
      this.RatioData[playerAccountNumber].push(playerAccount['properties'][0]['league'][0]['wins']);

      this.RatioLabels[playerAccountNumber].push("losses");
      this.RatioData[playerAccountNumber].push(playerAccount['properties'][0]['league'][0]['losses']);
    }
    this.playerAccountProperty[playerAccountNumber].isRatioLoaded = true;
  }

  private displayWinStatsGraph(playerAccount: Object, playerAccountNumber: number): any {
    this.statsLabels[playerAccountNumber] = [];
    this.statsData[playerAccountNumber] = [];

    if (this.gameId == "569104a0417130681bcf1586") {//csgo
      this.statsLabels[playerAccountNumber].push("deaths");
      this.statsData[playerAccountNumber].push(this.playerAccountGetByUserId['properties'][0]['stats']['total_deaths']);
      this.statsLabels[playerAccountNumber].push("kills");
      this.statsData[playerAccountNumber].push(this.playerAccountGetByUserId['properties'][0]['stats']['total_kills']);
    }
    if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      this.statsLabels[playerAccountNumber].push("deaths");
      this.statsData[playerAccountNumber].push(this.playerAccountGetByUserId['properties']["0"].lastMatchsInfos["0"].player_stats.stats.deaths);
      this.statsLabels[playerAccountNumber].push("kills");
      this.statsData[playerAccountNumber].push(this.playerAccountGetByUserId['properties']["0"].lastMatchsInfos["0"].player_stats.stats.kills);
      this.statsLabels[playerAccountNumber].push("assists");
      this.statsData[playerAccountNumber].push(this.playerAccountGetByUserId['properties']["0"].lastMatchsInfos["0"].player_stats.stats.assist);
    }

    this.playerAccountProperty[playerAccountNumber].isStatsLoaded = true;
  }

  private displayWinActivityGraph(playerAccount: Object, playerAccountNumber: number): any {
    this.activityLabels[playerAccountNumber] = [];
    this.activityData[playerAccountNumber] = [];

    if (this.gameId == "569104a0417130681bcf1586") {//csgo
      this.activityLabels[playerAccountNumber].push("rounds played");
      this.activityData[playerAccountNumber].push(this.playerAccountGetByUserId['properties'][0]['stats']['total_rounds_played']);
      this.activityLabels[playerAccountNumber].push("number of mvps");
      this.activityData[playerAccountNumber].push(this.playerAccountGetByUserId['properties'][0]['stats']['total_mvps']);

    }
    if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      this.activityLabels[playerAccountNumber].push("Number Of Double Kills");
      this.activityData[playerAccountNumber].push(this.playerAccountGetByUserId['properties']["0"].lastMatchsInfos["0"].player_stats.stats.doubleKills);
      this.activityLabels[playerAccountNumber].push("Number Of Triple Kills");
      this.activityData[playerAccountNumber].push(this.playerAccountGetByUserId['properties']["0"].lastMatchsInfos["0"].player_stats.stats.tripleKills);
      this.activityLabels[playerAccountNumber].push("Number Of Quadra Kills");
      this.activityData[playerAccountNumber].push(this.playerAccountGetByUserId['properties']["0"].lastMatchsInfos["0"].player_stats.stats.quadraKills);
      this.activityLabels[playerAccountNumber].push("Number Of Penta Kills");
      this.activityData[playerAccountNumber].push(this.playerAccountGetByUserId['properties']["0"].lastMatchsInfos["0"].player_stats.stats.pentaKills);
    }
    this.playerAccountProperty[playerAccountNumber].isActivityLoaded = true;
  }

private getAvatarPlayerAccount(playerAccountNumber: number): any{
    if(this.gameId == "569104a0417130681bcf1586") {//cs go
     return this.playerAccountGetByUserId['properties'][0]['userInfo']['avatar'];
    }
}
  private getUserNamePlayerAccount(playerAccountNumber: number): any {
    if (this.gameId == "569104a0417130681bcf1586") {//cs go
      return this.playerAccountGetByUserId['properties'][0]['userInfo']['pseudo'];

    }
    else if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      return this.playerAccountGetByUserId['login'];
    }
  }

  private getWinRatePlayerAccount(playerAccountNumber: number): any {
    let winRate = 0;
    if (this.gameId == "569104a0417130681bcf1586") {//cs go
      let win = 0, played = 0;
      win = this.playerAccountGetByUserId['properties'][0]['stats']['total_matches_won'];
      played = this.playerAccountGetByUserId['properties'][0]['stats']['total_matches_played'];
      return String(Math.floor(win / played * 100));
    }
    else if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      winRate = this.playerAccountGetByUserId['properties'][0]['league'][0]['wins']/this.playerAccountGetByUserId['properties'][0]['league'][0]['losses'];
      return String(Math.floor(winRate * 100));
    }
    return null;
  }

  private getTimePlayedCSGO(playerAccountNumber: number): any {
    let timePlayed;
    if (this.gameId == "569104a0417130681bcf1586") {//cs go
      timePlayed = Math.floor(this.playerAccountGetByUserId['properties'][0]['stats']['total_time_played'] / 3600) + "h";
      return timePlayed;
    }
    return null;
  }

  private getHeadShotPercentageCSGO(playerAccountNumber: number): any {
    if (this.gameId == "569104a0417130681bcf1586") {//cs go
      let kills = 0, headshot = 0;
      kills = this.playerAccountGetByUserId['properties'][0]['stats']['total_kills'];
      headshot = this.playerAccountGetByUserId['properties'][0]['stats']['total_kills_headshot'];
      return Math.floor(headshot / kills * 100);
    }
    return null;
  }

  private getAccuracyCSGO(playerAccountNumber: number): any {
    if (this.gameId == "569104a0417130681bcf1586") {//cs go
      let hit = 0, fire = 0;
      hit = this.playerAccountGetByUserId['properties'][0]['stats']['total_shots_hit'];
      fire = this.playerAccountGetByUserId['properties'][0]['stats']['total_shots_fired'];
      return Math.floor(hit / fire * 100);
    }
    return null;
  }

  private getMVPSCSGO(playerAccountNumber: number): any {
    if (this.gameId == "569104a0417130681bcf1586") {//cs go
      return this.playerAccountGetByUserId['properties'][0]['stats']['total_mvps'];
    }
    return null;
  }


  private getRankLOL(playerAccountNumber: number): any {
    let rank;
    if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      rank = this.playerAccountGetByUserId['properties']["0"].league["0"].tier+ ' ' +this.playerAccountGetByUserId['properties']["0"].league["0"].rank;
      return rank;
    }
    return null;
  }

  private getLeaguePointLOL(playerAccountNumber: number): any {
    if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      return this.playerAccountGetByUserId['properties']["0"].league["0"].leaguePoints;
    }
    return null;
  }

  private getLeagueNameLOL(playerAccountNumber: number): any {
    if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      return this.playerAccountGetByUserId['properties']["0"].league["0"].leagueName;
    }
    return null;
  }

  private getTotalMinionKillsLOL(playerAccountNumber: number): any {
    if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
      return this.playerAccountGetByUserId['properties']["0"].league["0"].leagueName;
    }
    return null;
  }

  private getPlayerAccountByUserIDByGameId( paId: string): any {
    this.playerAccountServiceInstance
      .GetSinglePlayerAccountById(paId)
      .subscribe(
        data => this.playerAccountGetByUserId = data,
        error => console.log(error),
        () => {
          console.log('get One Player Account by userId', this.playerAccountGetByUserId);

            console.log("Player Account 1 : ", this.playerAccountGetByUserId);
            this.playerAccountProperty[0] = {
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
              Case7: {
                loaded: false,
                value: "",
              },
            };
            this.displayWinRatioGraph(this.playerAccountGetByUserId,0);
            this.displayWinStatsGraph(this.playerAccountGetByUserId,0);
            this.displayWinActivityGraph(this.playerAccountGetByUserId,0);

            this.playerAccountProperty[0].Case1.value = this.getUserNamePlayerAccount(0); // Good

            this.playerAccountProperty[0].Case2.value = "NONE";
            this.playerAccountProperty[0].Case3.value = "NONE";

            this.playerAccountProperty[0].Case4.value = "Win : " + this.getWinRatePlayerAccount(0) + "%"; // Good

            if (this.gameId == "569104a0417130681bcf1586") {//cs go
              this.playerAccountProperty[0].Case5.value = "Accuracy : " + this.getAccuracyCSGO(0) + "%"; // Good
              this.playerAccountProperty[0].Case6.value = "Time Played : " + this.getTimePlayedCSGO(0); // Good
              this.playerAccountProperty[0].Case2.value = "Head Shot : " + this.getHeadShotPercentageCSGO(0) + "%"; // Good
              this.playerAccountProperty[0].Case3.value = "MVPS : " + this.getMVPSCSGO(0);
              this.playerAccountProperty[0].Case7.value = this.getAvatarPlayerAccount(0);
            }
            if (this.gameId == "586f56f5b9fde402faa33fdc") {//lol
              this.playerAccountProperty[0].Case2.value = "Total Minion Kills : " + this.getTotalMinionKillsLOL(0);
              this.playerAccountProperty[0].Case3.value = "League Name : " + this.getLeagueNameLOL(0);
              this.playerAccountProperty[0].Case5.value = "League Point : " + this.getLeaguePointLOL(0); // Good
              this.playerAccountProperty[0].Case6.value = this.getRankLOL(0); // Good
            }

            for (let u = 1; u < 8; u++) {
              if (!_.isEmpty(this.playerAccountProperty[0]['Case' + u].value) && !_.isNull(this.playerAccountProperty[0]['Case' + u].value)) {
                this.playerAccountProperty[0]['Case' + u].loaded = true;
              }
            }

            // this.getWinRatePlayerAccount(d);
            // this.getTimePlayedOrRank(d);
            // this.getUserNamePlayerAccount(d);


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
