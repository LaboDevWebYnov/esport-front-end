import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../../shared/services/user.service";
import {Configuration} from "../../../../../shared/app.constants";
import { CoolLocalStorage } from 'angular2-cool-storage';

@Component({
  selector: 'app-step3-team',
  templateUrl: './step3-team.component.html',
  styleUrls: ['./step3-team.component.css'],
  providers: [UserService, Configuration]
})
export class Step3TeamComponent implements OnInit {
  private users: Object;
  private userid: string;
  localStorage: CoolLocalStorage;
  constructor(private userServiceInstance: UserService, localStorage: CoolLocalStorage) {
    this.localStorage = localStorage
  }

  ngOnInit() {
    this.userid = this.localStorage.getItem('userId');

  }


}
