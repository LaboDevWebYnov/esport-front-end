import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../../shared/services/user.service";
import {Configuration} from "../../../../../shared/app.constants";

@Component({
  selector: 'app-step3-team',
  templateUrl: './step3-team.component.html',
  styleUrls: ['./step3-team.component.css'],
  providers: [UserService, Configuration]
})
export class Step3TeamComponent implements OnInit {
  private users: Object;
  constructor(private userServiceInstance: UserService) { }

  ngOnInit() {
    this.getUsers();
  }
  private getUsers(): void {
    this.userServiceInstance
      .GetAllUsers()
      .subscribe(
        data => this.users = data,
        error => console.log(error),
        () => {console.log('get all users complete', this.users)}
      );
  }

}
