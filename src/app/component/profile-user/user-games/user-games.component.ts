import { Component, OnInit } from '@angular/core';
import {GameService} from "../../../../shared/services/game.service";
import {CoolLocalStorage} from "angular2-cool-storage";
import { Configuration } from '../../../../shared/app.constants';
import {Game} from "../../../../shared/models/game";
import {forEach} from "@angular/router/src/utils/collection";


@Component({
  selector: 'app-user-games',
  templateUrl: './user-games.component.html',
  styleUrls: ['./user-games.component.css'],
  providers:[GameService,Configuration]

})
export class UserGamesComponent implements OnInit {
  localStorage: CoolLocalStorage;
  private userGames: Object;

  isCsAccount: Boolean = false;
  isLolAccount: Boolean = false;
  isDotaAccount: Boolean = false;
  isOWAccount: Boolean = false;
  isRLAccount: Boolean = false;


  constructor(private gameServiceInstance: GameService,
              localStorage: CoolLocalStorage) {
    this.localStorage = localStorage;
  }

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
              console.log('get user\'s games complete', this.userGames),
                callback(this.userGames, null)
            }
      );

  }

  ngOnInit() {
    var id = this.localStorage.getItem('userId');
    this.getUserGame(id, (userGames: Game[], errorMessage: string): any => {
            for(var i = 0; i<userGames.length; i++)
            {
              switch (userGames[i]._id)
              {
                case '569104a0417130681bcf1586' :
                  this.isCsAccount = true;
                  console.log('csAccountOk');
                  break;
                case '586f56bfb9fde402faa33fdb' :
                  this.isCsAccount = true;
                  console.log('RLAccountOk');
                  break;
                case '586f56f5b9fde402faa33fdc' :
                  this.isCsAccount = true;
                  console.log('LolAccountOk');
                  break;
                case '586f56587c2b7302f311eaa5' :
                  this.isCsAccount = true;
                  console.log('DT2AccountOk');
                  break;
                case '583d85afe26ea010b06b801b' :
                  this.isCsAccount = true;
                  console.log('OWAccountOk');
                  break;
              }
            }
    });

  }

}
