import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../shared/services/user.service";
import {CoolLocalStorage} from "angular2-cool-storage";

@Component({
  selector: 'app-header-connected',
  templateUrl: './header-connected.component.html',
  styleUrls: ['./header-connected.component.css']
})
export class HeaderConnectedComponent implements OnInit {

  localStorage: CoolLocalStorage;
  private userGetById: Object;
  constructor(private userServiceInstance: UserService, localStorage: CoolLocalStorage) { this.localStorage = localStorage;}

  ngOnInit() {

    let id = this.localStorage.getItem('userId');
    this.getItemUserById(id);
  }
  private getItemUserById(idUser: string): void {
    this.userServiceInstance
      .GetSingleUserById(idUser)
      .subscribe(
        data => this.userGetById = data,
        error => console.log(error),
        () => console.log('get user complete', this.userGetById)
      );
  }

}
