import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../../shared/services/team.service';
import { Configuration } from '../../../../shared/app.constants';
import { CoolLocalStorage } from "angular2-cool-storage";
import { Team } from "../../../../shared/models/team";

@Component({
  selector: 'app-user-social',
  templateUrl: 'user-social.component.html',
  styleUrls: ['user-social.component.css'],
  providers: [TeamService, Configuration]
})
export class UserSocialComponent implements OnInit {

  private teams: Object;
  public myTeamTab;
  localStorage : CoolLocalStorage;

  constructor(private teamServiceInstance: TeamService,
              localStorage: CoolLocalStorage,) {
    this.localStorage = localStorage;
  }

  ngOnInit() {
    var id = this.localStorage.getItem('userId');
    this.searchMyTeams(id, (status: number, error: any, dataTeam: Team[]) => {
      if (error) {
        console.log(error);
      }
      else {
        this.myTeamTab = dataTeam;
      }
    });
  }

  public searchMyTeams(id:string, callback):void{
    this.teamServiceInstance
      .GetTeamsByUserId(id)
      .subscribe(
        data =>  this.teams = data ,
        error =>{
          console.log(error);
          callback(401, JSON.parse(error._body).error, null);
        },
        () => {
          callback(200, null, this.teams)
        }
      );
  }


}
