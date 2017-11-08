import { Component, OnInit } from '@angular/core';
import { Configuration } from '../../../../shared/app.constants';
import {TeamService} from "../../../../shared/services/team.service";
import {PlayerAccountService} from "../../../../shared/services/player-account.service";
import {Team} from "../../../../shared/models/team";
import {CreateTeamObject} from "../../../../shared/models/utils/create-update-team-object";
import { CoolLocalStorage } from "angular2-cool-storage";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-details-team',
  templateUrl: './details-team.component.html',
  styleUrls: ['./details-team.component.css'],
  providers: [TeamService, PlayerAccountService, Configuration]
})
export class DetailsTeamComponent implements OnInit {
  teamById: Object;
  teamByName: Object;
  playerById: Object;
  response: Object;
  member : Object;
  updateTeam: Object;
  localStorage : CoolLocalStorage;
  teamId: string;

  constructor(private teamServiceInstance: TeamService, private playerAccountInstance : PlayerAccountService,localStorage: CoolLocalStorage,private router: Router,private route: ActivatedRoute,) {
    this.localStorage = localStorage;
  }

  ngOnInit() {
    this.teamId = this.route.snapshot.params['teamid'];
    console.log(this.teamId);
    //this.teamId = this.localStorage.getItem('teamId');
    this.getSingleTeamById(this.teamId);
    //this.getSingleTeamByName("Djamel");
    //this.getAllTeams();
    //this.getPlayerById("58aaea1f1759e21314c0281e");
  }

  private getSingleTeamById(id: string): void {
    this.teamServiceInstance
      .GetSingleTeamById(id)
      .subscribe(
        data => this.response = data,
        error => console.log(error),
        () => console.log('get team by id complete', this.response)
      );
  }

  private getSingleTeamByName(name: string): void {
    this.teamServiceInstance
      .GetSingleTeamByName(name)
      .subscribe(
        data => this.teamByName = data,
        error => console.log(error),
        () => console.log('get team by name complete', this.teamByName)
      );
  }

 /* private getAllTeams(): void {
    this.teamServiceInstance
      .GetAllTeam()
      .subscribe(
        data => this.response = data,
        error => console.log(error),
        () => console.log('get all teams', this.response)
      );
  }
*/
  private getPlayerById(id: string) {
    this.playerAccountInstance
      .GetSinglePlayerAccountById(id)
      .subscribe(
        data => this.playerById = data,
        error => console.log(error),
        () => console.log('get player account by id', this.playerById)
      );

  }

  public submitAddForm(maTeam : Team):void{
    var teamId: string = (<HTMLInputElement>document.getElementById('teamId')).value;
    var playerAccountId:string = (<HTMLInputElement>document.getElementById('playerAccountId')).value;
    var message = "";

    for(var i = 0; i < maTeam.players.length; i++){
      if(maTeam.players[i]._id == playerAccountId){
        message = "0";
      }else{
        this.addMember(teamId,playerAccountId);
        message = "1";
        console.log('test add Member');
      }
    }

    if(message == "0"){
      alert('Le membre existe déjà !');
    }else{
      alert('Le membre a été ajouté !');
    }


  }

 public submitUpdateTeamForm(teamId : string, maTeam : Team):void{

   var  updateTeam: CreateTeamObject = {
     teamName:(<HTMLInputElement>document.getElementById('nvNom')).value,
     teamTag:(<HTMLInputElement>document.getElementById('nvTag')).value,
     teamCountry: null,
     captainPlayerAccountId:(<HTMLInputElement>document.getElementById('nvCaptain')).value
   };


    this.updatedTeamName(teamId,updateTeam);
    console.log('test update team name');
  }

private addMember(teamid: string, playerAccountId: string) {
    this.teamServiceInstance
      .addPlayerAccountInTeam(teamid, playerAccountId)
      .subscribe(
        data => this.member = data,
        error => console.log(error),
        () => console.log('Add member complete', this.member)
      );
  }

 private updatedTeamName(teamId : string , maTeam : CreateTeamObject) {
        this.teamServiceInstance.updateTeamName(teamId, maTeam).subscribe(
        data => this.updateTeam = data,
        error => console.log(error),
        () => console.log('Update Team Name complete', this.updateTeam)
      );

  }

  public onSelectPlayer(id : string):void{
    console.log("Id " +id);
    this.getPlayerById(id);
  }
}
