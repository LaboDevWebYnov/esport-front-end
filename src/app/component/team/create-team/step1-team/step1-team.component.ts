import { Component, OnInit } from '@angular/core';
import {Router}                  from '@angular/router';
import {CreateTeamObject} from '../../../../../shared/models/utils/create-update-team-object';
import {Configuration} from '../../../../../shared/app.constants';
import { CoolLocalStorage } from 'angular2-cool-storage';


@Component({
  selector: 'app-step1-team',
  templateUrl: './step1-team.component.html',
  styleUrls: ['./step1-team.component.css']
})


  export class Step1TeamComponent {
  private response: Object;
  localStorage: CoolLocalStorage;
  private teamRegistered: CreateTeamObject;
  private userId: string;
  //form&http_query status
  status = null;
  submitted = false;
  public errorMessage: string;
  public infoMessage: string;
  constructor(
    private _router: Router,
    localStorage: CoolLocalStorage


  ) {
    this.localStorage = localStorage;
  }

  onSubmit(event) {
    //console.log(event);
    //console.log(event.target[5].value);

    //set when the form is submited
      this.submitted = true;

      this.teamRegistered = new CreateTeamObject();

    //check if it's the same password

      //name
      this.teamRegistered.teamName = event.target[0].value;
      //tag
      this.teamRegistered.teamTag = event.target[1].value;
      //rank
     // this.teamRegistered.rank = event.target[2].value;
      //country
      this.teamRegistered.teamCountry = event.target[3].value;


      //local storage des data

      this.localStorage.setItem('teamName', event.target[0].value);
      this.localStorage.setItem('teamTag', event.target[1].value);
      this.localStorage.setItem('teamCountry', event.target[2].value);
      this._router.navigate(['team/create-team/step2-team']);


  };




}
