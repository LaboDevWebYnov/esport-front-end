import { Component, OnInit } from '@angular/core';
import {GameService} from '../../../../../shared/services/game.service';
import {Configuration} from "../../../../../shared/app.constants";
import {Router, ActivatedRoute} from '@angular/router';
import {CreateTeamObject} from '../../../../../shared/models/utils/create-update-team-object';
import {TeamService} from '../../../../../shared/services/team.service';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { PlayerAccountService } from '../../../../../shared/services/player-account.service';
import {isBoolean} from "util";
import {PlayerAccount} from "../../../../../shared/models/player-account"


@Component({
  selector: 'app-step3-team',
  templateUrl: './step3-team.component.html',
  styleUrls: ['./step3-team.component.css'],
  providers: [GameService, Configuration, TeamService, PlayerAccountService]
})
export class Step3TeamComponent implements OnInit {
  private response: Object;
  localStorage: CoolLocalStorage;
  private teamRegistered: CreateTeamObject;
  private userId: string;
  private playerAccountId: string;
  private gameId: string;
  private checked: boolean;
  private playerAccount: Object;
  //form&http_query status
  status = null;
  submitted = false;
  public errorMessage: string;
  public infoMessage: string;
  private games: Object;
  public tab;
  public arrayOfKeyValues = [];
  public playerAccountSelected: any;

  constructor(private gameServiceInstance: GameService, private router: Router, localStorage: CoolLocalStorage, private teamServiceInstance: TeamService, private playerAccountServiceInstance: PlayerAccountService) {
    this.localStorage = localStorage
  }

  ngOnInit() {
    this.userId = this.localStorage.getItem('userId');
    this.gameId = this.localStorage.getItem('gameId');
    this.getPlayerAccountByUserIdByGame(this.userId,this.gameId, (error:any, data: PlayerAccount[]) => {
      for(let i=0;i<data.length;i++)
      {
        this.arrayOfKeyValues.push({key: data[i]._id, value: data[i].login});
      }
      this.tab = data;
    });
  }





  onSubmit(event) {
    console.log(event);
    console.log("cool"+event.target[1].value);
    console.log("player account");

    //set when the form is submited
    this.submitted = true;
    this.teamRegistered = new CreateTeamObject();

    //name
    this.teamRegistered.teamName = this.localStorage.getItem('teamName');
    //tag
    this.teamRegistered.teamTag = this.localStorage.getItem('teamTag');
    //rank
    // this.teamRegistered.rank = event.target[3].value;
    //country
    this.teamRegistered.teamCountry = this.localStorage.getItem('teamCountry');
    //capitaine
    this.teamRegistered.captainPlayerAccountId = event.target[1].value;

    //register user

    this.registerTeam(this.userId, this.teamRegistered, this.gameId, (status: number, errorMessage: string, infoMessage: string) => {
      if (status == 200) {
        this.status = status;
        this.errorMessage = errorMessage;
        this.infoMessage = infoMessage;


        this.router.navigate(['team/create-team/step4-team']);
      }
      else {
        this.status = status;
        this.errorMessage = errorMessage;
        this.infoMessage = infoMessage;
        console.log(this.status);
        console.log(this.errorMessage);
        console.log(this.infoMessage);
      }
    });

  };
  private registerTeam(userId: string, teamRegistered: CreateTeamObject,gameId: string, callback): any {
    this.teamServiceInstance
      .registerTeamMainInfo(userId,teamRegistered, gameId)
      .subscribe(


        data => this.response = data,
        error => {
          //console.log(error);

          callback(401, error._body.error, null);

        },
        () => {

          console.log('register team complete');
          console.log('response', this.response);
          var team = this.response;

          console.log("team",team);
          var teamId = team["id"];
          this.localStorage.setItem('teamId',teamId);

          callback(200, null, 'team registered !', this.response);
        }
      )};
  private getPlayerAccountByUserIdByGame(UserId: string, GameId: string, callback): void {
    this.playerAccountServiceInstance
      .GetPlayerAccountByUserIdByGame(UserId, GameId)
      .subscribe(
        data => this.playerAccount = data,
        error => {console.log(error),callback(error,null)},
        () => {console.log('get player account by game and user id complete',this.playerAccount),callback(null,this.playerAccount)}
      );
  }



}
