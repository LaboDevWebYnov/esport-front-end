import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../../shared/services/team.service';
import { UserService } from '../../../../shared/services/user.service';
import { Router }                  from '@angular/router';
import { Configuration } from '../../../../shared/app.constants';
import { Team } from "../../../../shared/models/team";
import { User } from "../../../../shared/models/user";
import { CoolLocalStorage } from "angular2-cool-storage";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  providers: [TeamService, Configuration, UserService]
})
export class TeamComponent implements OnInit {
  private teams: Object;
  status = null;
  public searchTeamTab;
  public myTeamTab;
  localStorage : CoolLocalStorage;

  constructor(private teamServiceInstance: TeamService,
              private userServiceInstance: UserService,
              localStorage: CoolLocalStorage,
              private router: Router) {
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

  display(id:string):void {
    if (document.getElementById(id).style.maxHeight=="0px") {
      document.getElementById(id).style.maxHeight="5000px";
      id += "Arrow";
      var elmt = document.getElementById(id);
      elmt.style.webkitTransform="rotate(0deg)";
      elmt.style.transform="rotate(0deg)";
    } else {
      document.getElementById(id).style.maxHeight="0px";
      id += "Arrow";
      var elmt = document.getElementById(id);
      elmt.style.webkitTransform="rotate(180deg)";
      elmt.style.transform="rotate(180deg)";
    }
    // elmt.="rotate(0deg)";
    // elmt.style.webkitTransform="rotate(0deg)";
    // elmt.style.webkitTransform="rotate(0deg)";
    // -moz-transform: rotate(180deg);
    // -o-transform: rotate(180deg);
    // -ms-transform: rotate(180deg);
  }

  onCreate(){
    this.router.navigate(['team/create-team' ]);
  }

  onSubmit(event):void {
    console.log("Recherche : "+ event.target[0].value);

    this.searchTeams(event.target[0].value, (status: number, error: any, dataTeam: Team[]) => {
      if (error) {
        console.log(error);
      }
      else {
        this.searchTeamTab = dataTeam;
        // console.log('callback',dataTeam);
        // console.log('tab',this.searchTeamTab);
      }
    });

    var id ="listTeam";
    document.getElementById(id).style.maxHeight="0px";
    id += "Arrow";
    var elmt = document.getElementById(id);
    elmt.style.webkitTransform="rotate(180deg)";
    elmt.style.transform="rotate(180deg)";
  }

  public searchTeams(name:string, callback):void{
    this.teamServiceInstance
      .GetTeamsByLikeName(name)
      .subscribe(
        data => {
          this.teams = data;
          this.status= null;
        },
        error =>{
          console.log(error);
          callback(401, JSON.parse(error._body).error, null);
          this.status = 401;
        },
        () => {
          callback(200, null, this.teams)
        }
      );
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
