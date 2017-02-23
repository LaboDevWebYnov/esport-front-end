import { Component, OnInit } from '@angular/core';
import {Router}                  from '@angular/router';


@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})


  export class CreateTeamComponent {
  constructor(
    private _router: Router,

  ) {
  }

  onNext() {
    this._router.navigate(['/two/step2']);
  }
}

