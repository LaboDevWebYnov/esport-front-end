import { Component, OnInit } from '@angular/core';
import {GameService} from "../../../../shared/services/game.service";
import {Game} from "../../../../shared/models/game";
import {CoolLocalStorage} from "angular2-cool-storage";
import {Configuration} from "../../../../shared/app.constants";

@Component({
  selector: 'app-user-results',
  templateUrl: 'user-results.component.html',
  styleUrls: ['user-results.component.css'],
  providers:[GameService,Configuration]
})
export class UserResultsComponent implements OnInit {
  localStorage: CoolLocalStorage;
  private userGames: Object;
  private games: Object;

  constructor(private gameServiceInstance: GameService,
              localStorage: CoolLocalStorage) {
    this.localStorage = localStorage;
  }

  // Doughnut
  public RatioChartType:string = 'doughnut';
  public RatioLabels:string[] = ['Win', 'Draw', 'Lose'];
  public RatioData:number[] = [52, 12, 36];

  private getUserGame(idUser: string, callback): any {
    this.gameServiceInstance
      .GetUserGames(idUser)
      .subscribe(
        data => this.userGames = data,
        error => {
          console.log(error),
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
