import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../../shared/services/team.service';
import { Configuration } from '../../../../shared/app.constants';
import { CoolLocalStorage } from "angular2-cool-storage";
import { Team } from "../../../../shared/models/team";
import {UserService} from '../../../../shared/services/user.service';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-user-social',
  templateUrl: 'user-social.component.html',
  styleUrls: ['user-social.component.css'],
  providers: [TeamService, Configuration, UserService]
})
export class UserSocialComponent implements OnInit {

  private teams: Object;
  public myTeamTab;
  localStorage: CoolLocalStorage;
private friends: Object;
  private currentUser: Object

  constructor(private teamServiceInstance: TeamService,
              localStorage: CoolLocalStorage,
              private userServiceInstance: UserService,) {
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
    this.userServiceInstance.GetSingleUserById(id)
      .subscribe(
        data =>  this.currentUser = data ,
        error => {
          console.log(error);
        },
        () => {
          console.log('Get friends by user: ', this.currentUser);
        }
      );

  }
  addingFriends(event){
    console.log(event);
    var id = this.localStorage.getItem('userId');
    var friendId = event.target[0].value;
    this.addFriends(id, friendId);
  }
  public openAddFriendsModal() :void{
    (<HTMLElement>document.getElementById("openAddFriendsModal")).style.display = "block";
  }

  public closeAddFriendsModal() :void{
    for(let i = 0; i < document.getElementsByClassName("checkboxGameSelection").length; i++)
    {
      (<HTMLInputElement>document.getElementsByClassName("checkboxGameSelection")[i]).checked = false;
    }
    (<HTMLElement>document.getElementById("openAddFriendsModal")).style.display = "none";
  }

  public searchMyTeams(id:string, callback):void{
    this.teamServiceInstance
      .GetTeamsByUserId(id)
      .subscribe(
        data =>  this.teams = data ,
        error =>{
          console.log(error);
          callback(401, error._body.error, null);
        },
        () => {
          callback(200, null, this.teams);
        }
      );
  }
  public addFriends(id:string, friends:string):void{
    this.userServiceInstance
      .AddFriends(id,friends)
      .subscribe(
        data =>  this.friends = data ,
        error =>{
          console.log(error);

        },
        () => {
          console.log('get One Player Account just PA', this.friends);
        }
      );
  }




}
