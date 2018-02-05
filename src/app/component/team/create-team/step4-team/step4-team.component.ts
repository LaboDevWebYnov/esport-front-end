import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../../shared/services/user.service";
import {Configuration} from "../../../../../shared/app.constants";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {TeamService} from '../../../../../shared/services/team.service';
import { PlayerAccountService } from '../../../../../shared/services/player-account.service';
import {PlayerAccount} from "../../../../../shared/models/player-account";
import {Team} from "../../../../../shared/models/team";
import {Router, ActivatedRoute} from '@angular/router';
import {createElement} from "@angular/core/src/view/element";
import {isSuccess} from "@angular/http/src/http_utils";

@Component({
  selector: 'app-step4-team',
  templateUrl: './step4-team.component.html',
  styleUrls: ['./step4-team.component.css'],
  providers: [UserService, Configuration, TeamService, PlayerAccountService]
})
export class Step4TeamComponent implements OnInit {
  private playerAccountName: string;
  private playerAccountId: string;
  private playerAccountGetByLogin: Object;
  private response: Object;
  private status: boolean;
  private players: object;
  private team : object;
  private teamId: string;
  localStorage: CoolLocalStorage;
  constructor(private router: Router, private userServiceInstance: UserService, localStorage: CoolLocalStorage,private teamServiceInstance: TeamService, private playerAccountServiceInstance: PlayerAccountService) {
    this.localStorage = localStorage
  }

  ngOnInit() {
    let nameTeam = this.localStorage.getItem('teamName');
    this.getTeam(nameTeam, (team: Object[], errorMessage: string): any =>{
      this.localStorage.setItem('teamId', team["_id"]);
      console.log(team);
      this.players = team["players"];
      console.log(this.players);

    });
  }

  onClicked(event){
    this.status = false;
    //console.log(event);
    this.playerAccountName = (<HTMLInputElement>document.getElementById("playerAccount")).value;
    //console.log(this.playerAccountName);

      this.getItemPlayerAccountByLogin(this.playerAccountName, (playerAccount: Object) => {

        //console.log(playerAccount["_id"]);
        this.playerAccountId = playerAccount["_id"];
        this.teamId = this.localStorage.getItem("teamId");
        this.addPlayerAccountInTeam(this.teamId, this.playerAccountId,(error, success):any => {
          if(error == null && success != null){
            this.status = true;

            let list = (<HTMLElement>document.getElementById("listPlayers"));
            let div = document.createElement('div');
            div.textContent = this.playerAccountName;
            list.appendChild(div);
          }else{
            this.status = false;
          }
        });
      });

  }
  onSubmit(event) {
    this.router.navigate(['team/create-team/step5-team']);
  }
  private getItemPlayerAccountByLogin(Login : string, callback): void {
    this.playerAccountServiceInstance
      .GetSinglePlayerAccountByLogin(Login)
      .subscribe(
        data => {this.playerAccountGetByLogin = data;},
        error => console.log(error),
        () =>{ console.log('get One Player Account by Login',this.playerAccountGetByLogin),callback(this.playerAccountGetByLogin )}//console.log('get All Items complete')

      );
    ;
  }

  private getTeam(nameTeam: string, callback): any{
    this.teamServiceInstance
      .GetSingleTeamByName(nameTeam)
      .subscribe(
        data => this.team = data,
        error => console.log(error),
        () => {callback(this.team, null)}
      );
  }



  private addPlayerAccountInTeam(TeamId: string, PlayerAccount: string, callback): any {
    this.teamServiceInstance
      .addPlayerAccountInTeam(TeamId, PlayerAccount)
      .subscribe(
        data => this.response = data,
        error => callback(error, null),
        () => callback(null, this.response)
          /*console.log('add is complete',this.playerAccountId);

          /* Ajoute le pseudo à la vue
          let list = (<HTMLElement>document.getElementById("listPlayers"));
          let div = document.createElement('div');
          div.textContent = this.playerAccountName;
          list.appendChild(div);
        }*/

      );
  }

}
