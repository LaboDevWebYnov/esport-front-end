import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../../shared/services/team.service';
import {Router}                  from '@angular/router';
import { Configuration } from '../../../../shared/app.constants';
import { Team } from "../../../../shared/models/team";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  providers: [TeamService, Configuration]
})
export class TeamComponent implements OnInit {
  private teams: Object;

  constructor(private teamServiceInstance: TeamService,private router: Router) { }

  ngOnInit() {
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
    this.searchTeams(event.target[0].value);

    var id ="listTeam";
    document.getElementById(id).style.maxHeight="0px";
    id += "Arrow";
    var elmt = document.getElementById(id);
    elmt.style.webkitTransform="rotate(180deg)";
    elmt.style.transform="rotate(180deg)";
  }

  public searchTeams(name:string):void{
    this.teamServiceInstance
      .GetSingleTeamByName(name)
      .subscribe(
        data => this.teams = data,
        error => console.log(error),
        () => {console.log('getSingleTeamByName', this.teams)}
      );

  }
}
