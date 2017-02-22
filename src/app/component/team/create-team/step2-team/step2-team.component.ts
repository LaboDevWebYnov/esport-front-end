import { Component, OnInit } from '@angular/core';
import {GameService} from '../../../../../shared/services/game.service';
import {Configuration} from "../../../../../shared/app.constants";
import {Router, ActivatedRoute} from '@angular/router';
import {CreateTeamObject} from '../../../../../shared/models/utils/create-update-team-object';
import {TeamService} from '../../../../../shared/services/team.service';
import { CoolLocalStorage } from 'angular2-cool-storage';

@Component({
  selector: 'app-step2-team',
  templateUrl: './step2-team.component.html',
  styleUrls: ['./step2-team.component.css'],
  providers: [GameService, Configuration, TeamService]
})
export class Step2TeamComponent implements OnInit {
  private response: Object;
  localStorage: CoolLocalStorage;
  private teamRegistered: CreateTeamObject;
  private userId: string;
  private playerAccountId: string;
  private gameId: string;
  //form&http_query status
  status = null;
  submitted = false;
  public errorMessage: string;
  public infoMessage: string;
  private games: Object;
  constructor(private gameServiceInstance: GameService, private router: Router, localStorage: CoolLocalStorage, private teamServiceInstance: TeamService) {
    this.localStorage = localStorage;
  }

  ngOnInit() {
    this.getGames();
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

  onSubmit(event) {
    //console.log(event);

    this.gameId = event.target[0].id;

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
    //this.teamRegistered.captainPlayerAccountId = "58aaea1bd277c80fd4f21514";
    //this.teamRegistered.captain = this.localStorage.getItem('userId');
    this.playerAccountId = "58aab78a1fdbee1067a42a64";
    //register user







    this.registerTeam(this.playerAccountId, this.teamRegistered, this.gameId, (status: number, errorMessage: string, infoMessage: string) => {
      if (status == 200) {
        this.status = status;
        this.errorMessage = errorMessage;
        this.infoMessage = infoMessage;

        this.router.navigate(['team/create-team/step3-team']);
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
  private registerTeam(playerAccountId: string, teamRegistered: CreateTeamObject,gameId: string, callback): any {
    this.teamServiceInstance
      .registerTeamMainInfo(playerAccountId,teamRegistered, gameId)
      .subscribe(
        data => this.response = data,
        error => {
          console.log(error);

          callback(401, JSON.parse(error._body).error, null);

        },
        () => {
          //console.log('register user complete', this.response);
          callback(200, null, 'team registered !');
        }
      );
  }



}
