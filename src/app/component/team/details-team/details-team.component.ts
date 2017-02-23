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

<<<<<<< HEAD
  constructor() {


=======
  teamById: Object;
  teamByName: Object;
  playerById: Object;
  response: Object;

  constructor(private teamServiceInstance: TeamService, private playerAccountInstance : PlayerAccountService) {
>>>>>>> 9e86103404bd2d3dbca0ef784d2ea48370cf07fa
  }

  ngOnInit() {
    this.getSingleTeamById("58ac0c1d9fd7680604b65adc");
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

  private getAllTeams(): void {
    this.teamServiceInstance
      .GetAllTeam()
      .subscribe(
        data => this.response = data,
        error => console.log(error),
        () => console.log('get all teams', this.response)
      );
  }

  private getPlayerById(id: string) {
    this.playerAccountInstance
      .GetSinglePlayerAccountById(id)
      .subscribe(
        data => this.playerById = data,
        error => console.log(error),
        () => console.log('get player account by id', this.playerById)
      );

  }

}
