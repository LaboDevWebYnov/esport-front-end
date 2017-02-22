import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../../shared/services/team.service';
import { Configuration } from '../../../../shared/app.constants';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  providers: [TeamService, Configuration]
})
export class TeamComponent implements OnInit {
  private teams: Object;

  constructor(private teamServiceInstance: TeamService,) { }

  ngOnInit() {
  }

  display(id:string):void {
    if (document.getElementById(id).style.maxHeight=="0px") {
      document.getElementById(id).style.maxHeight="";
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

  onSubmit(event) {
    console.log("Recherche : "+ event.target[0].value);
    this.searchTeams(event.target[0].value);
  }

  private searchTeams(team:string){
    this.teamServiceInstance
      .GetSingleTeamByName(team)
      .subscribe(
        data => this.teams = data,
        error => console.log(error),
        () => {/*console.log('getSingleTeamByName', this.teams)*/}
      );

  }
}
