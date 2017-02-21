import { Component, OnInit } from '@angular/core';
import {Router}                  from '@angular/router';


@Component({
  selector: 'app-step1-team',
  templateUrl: './step1-team.component.html',
  styleUrls: ['./step1-team.component.css']
})


  export class Step1TeamComponent {
  constructor(
    private _router: Router,

  ) {
  }

  onNext() {
    this._router.navigate(['team/create-team/step2-team']);
  }
}
