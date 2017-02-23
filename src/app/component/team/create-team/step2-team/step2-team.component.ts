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
        this.status = 200;
        this.infoMessage = null;
        this.errorMessage = null;
        console.log('Y a des game');
        this.localStorage.setItem('gameId', selectedGame);
        this.router.navigate(['team/create-team/step3-team' ]);
      }
    });
    //this.router.navigate(['team/create-team/step3-team']);





  };


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
