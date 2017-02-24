import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../../shared/services/user.service";
import {Configuration} from "../../../../../shared/app.constants";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {TeamService} from '../../../../../shared/services/team.service';
import { PlayerAccountService } from '../../../../../shared/services/player-account.service';
import {PlayerAccount} from "../../../../../shared/models/player-account";

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
  private teamId: string;
  localStorage: CoolLocalStorage;
  constructor(private userServiceInstance: UserService, localStorage: CoolLocalStorage,private teamServiceInstance: TeamService, private playerAccountServiceInstance: PlayerAccountService) {
    this.localStorage = localStorage
  }

  ngOnInit() {

  }
  onClicked(event){
    //console.log(event);
    this.playerAccountName = (<HTMLInputElement>document.getElementById("playerAccount")).value;
    //console.log(this.playerAccountName);

      this.getItemPlayerAccountByLogin(this.playerAccountName, (playerAccount: Object) => {

        console.log(playerAccount);
        this.playerAccountId = playerAccount[0]["_id"];
        console.log(this.playerAccountId);
        this.teamId = this.localStorage.getItem("teamId");
        console.log("team id" + this.teamId);
        this.addPlayerAccountInTeam(this.teamId, this.playerAccountId);

      });




  }
  onSubmit(event) {

  }
  private getItemPlayerAccountByLogin(Login : string, callback): void {
    this.playerAccountServiceInstance
      .GetSinglePlayerAccountByLogin(Login)
      .subscribe(
        data => {this.playerAccountGetByLogin = data;},
        error => console.log(error),
        () =>{ console.log('get One Player Account by Login blblblbl',this.playerAccountGetByLogin),callback(this.playerAccountGetByLogin )}//console.log('get All Items complete')

      );
    ;





  }


  private addPlayerAccountInTeam(TeamId: string, PlayerAccount: string): any {
    this.teamServiceInstance
      .addPlayerAccountInTeam(TeamId, PlayerAccount)
      .subscribe(

        error => console.log(error),
        () => {console.log('add is complete',this.playerAccountId)}

      );
  }


}
