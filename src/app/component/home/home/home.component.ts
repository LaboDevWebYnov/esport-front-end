import { Component, OnInit } from '@angular/core';
import {Configuration} from '../../../../shared/app.constants';
import {TeamService} from '../../../../shared/services/team.service';
import { CoolLocalStorage } from 'angular2-cool-storage';
import {GameService} from '../../../../shared/services/game.service';
import {NewsService} from "../../../../shared/services/news.service";
import {PlayerAccount} from '../../../../shared/models/player-account';
import {User} from '../../../../shared/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [Configuration, TeamService, GameService, NewsService]
})
export class HomeComponent implements OnInit {
  private team: Object;
  private currentConnectedUserId: string;
  private yourTeams: Object;
  private games: Object;
  private news: Object;
  public isFilteredGameId: any;
  localStorage: CoolLocalStorage;

  constructor(
              private gameServiceInstance: GameService,
              private newsServiceInstance: NewsService,
              private teamServiceInstance: TeamService, localStorage: CoolLocalStorage) {
      this.localStorage = localStorage;}


  ngOnInit() {
    this.getTeam();
    this.getNews();
    this.currentConnectedUserId = this.localStorage.getItem('userId');
    this.teamServiceInstance.GetTeamsByUserId(this.currentConnectedUserId, )
      .subscribe(
        data =>  this.yourTeams = data ,
        error => {
          console.log(error);
          },
        () => {
          console.log('Get teams by user: ', this.yourTeams);
        }
      );
    this.getGames();
  }
    private getTeam(): void {
      this.teamServiceInstance
        .GetAllTeam()
        .subscribe(
          data => this.team = data,
          error => console.log(error),
          () => {
            console.log('get all news complete', this.team);

          }
        );
    }
    private getGames(): void {
    this.gameServiceInstance
      .GetAllGames()
      .subscribe(
        data => this.games = data,
        error => console.log(error),
        () => {/*console.log('get all games complete', this.games)*/}
      );
  }
  public checkFilter(gameIdFiltered: string)
  {
    this.isFilteredGameId = gameIdFiltered;
  }
  private getNews(): void {
    this.newsServiceInstance
      .GetAllNews()
      .subscribe(
        data => this.news = data,
        error => console.log(error),
        () => {
          console.log('get all news complete', this.news);

        }
      );
  }
}
