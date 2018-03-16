import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CoolLocalStorage } from 'angular2-cool-storage';

@Component({
  selector: 'app-step1-tournament',
  templateUrl: './step1-tournament.component.html',
  styleUrls: ['./step1-tournament.component.css']
})
export class Step1TournamentComponent implements OnInit {

  localStorage: CoolLocalStorage;

  constructor(private router: Router, localStorage: CoolLocalStorage) {
    this.localStorage = localStorage;
  }

  ngOnInit() {

  }

  //Triggered when the form is submited
  onSubmit(event) {
    this.localStorage.setItem('tooName', event.target[0].value);
    console.log(this.localStorage.getItem('tooName'));
    if(event.target[1].value){
      this.localStorage.setItem('tooOrganizer', event.target[1].value);
      console.log(this.localStorage.getItem('tooOrganizer'));
    }
    if(event.target[2].value){
      this.localStorage.setItem('tooUrl', event.target[2].value);
      console.log(this.localStorage.getItem('tooUrl'));
    }
    if(event.target[3].value){
      this.localStorage.setItem('tooDescription', event.target[3].value);
      console.log(this.localStorage.getItem('tooDescription'));
    }
    this.router.navigate(['events/step2']);
  };

}
