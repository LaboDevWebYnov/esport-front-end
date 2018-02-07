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
   // console.log(event);

    //this.gameId = event.target[0].id;
    //console.log(this.gameId);
    //set when the form is submited
    this.submitted = true;



    this.isOneChecked(event, "checkboxGame", (isChecked: boolean, selectedGame: string) => {
      if(!isChecked)
      {
        this.status = 401;
        this.infoMessage = null;
        this.errorMessage = "You must select one game to continue ...";
        console.log('Y a pas de game');
      }
      else
      {
        this.teamRegistered = new CreateTeamObject();
        this.userId = this.localStorage.getItem('userId');
        this.gameId = this.localStorage.getItem('gameId');
        //name
        this.teamRegistered.teamName = this.localStorage.getItem('teamName');
        //tag
        this.teamRegistered.teamTag = this.localStorage.getItem('teamTag');
        //rank
        // this.teamRegistered.rank = event.target[3].value;
        //country
        this.teamRegistered.teamCountry = this.localStorage.getItem('teamCountry');
        //capitaine
        this.teamRegistered.captainPlayerAccountId = this.userId;

        //register user

        this.registerTeam(this.userId, this.teamRegistered, this.gameId, (status: number, errorMessage: string, infoMessage: string) => {
          if (status == 200) {
            this.status = status;
            this.errorMessage = errorMessage;
            this.infoMessage = infoMessage;


           // this.router.navigate(['team/create-team/step4-team']);
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





        this.status = 200;
        this.infoMessage = null;
        this.errorMessage = null;
        console.log('Y a des game');
        this.localStorage.setItem('gameId', selectedGame);
        this.router.navigate(['team/create-team/step4-team' ]);
      }
    });
    //this.router.navigate(['team/create-team/step3-team']);





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


  private isOneChecked(event: any, className: string, callback): any {
    let selectedGame = "";
    let cpt = 0;
    let isChecked = false;
    for(let i=0;i<document.getElementsByClassName(className).length;i++)
    {
      if(event.target[i].checked)
      {
        if(cpt == 0)
        {
          selectedGame = event.target[i].id;
        }
        else
        {
          selectedGame += ':'+event.target[i].id;
        }
        isChecked = true;
        cpt ++;
      }
    }
    callback(isChecked,selectedGame);

  }


}
