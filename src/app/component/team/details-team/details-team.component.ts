import { Component, OnInit } from '@angular/core';
import { Configuration } from '../../../../shared/app.constants';
import {TeamService} from "../../../../shared/services/team.service";
import {PlayerAccountService} from "../../../../shared/services/player-account.service";

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

  constructor(private teamServiceInstance: TeamService, private playerAccountInstance : PlayerAccountService) {

  }

  ngOnInit() {
    this.getSingleTeamById("58ac0d539fd7680604b65add");
    //this.getSingleTeamByName("Djamel");
    //this.getAllTeams();
    this.getPlayerById("58aaea1f1759e21314c0281e");
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

  public submitAddForm():void{
    var teamId: string = (<HTMLInputElement>document.getElementById('teamId')).value;
    var playerAccountId:string = (<HTMLInputElement>document.getElementById('playerAccountId')).value;
    this.addMember(teamId,playerAccountId);
    console.log('test add Member');
  }

 /* public submitUpdateTeamForm():void{
    var teamId: string = (<HTMLInputElement>document.getElementById('teamId')).value;
    var teamName:string = (<HTMLInputElement>document.getElementById('teamName')).value;
    this.updatedTeamName(teamId,teamName);
    console.log('test update team name');
  }*/

private addMember(teamid: string, playerAccountId: string) {
    this.teamServiceInstance
      .addPlayerAccountInTeam(teamid, playerAccountId)
      .subscribe(
        data => this.member = data,
        error => console.log(error),
        () => console.log('Add member complete', this.member)
      );

  }
 /* private updatedTeamName(teamid: string, teamName: string) {
        this.teamServiceInstance.updateTeamName(teamid, teamName).subscribe(
        data => this.updateTeam = data,
        error => console.log(error),
        () => console.log('Update Team Name complete', this.updateTeam)
      );

  }*/
}
