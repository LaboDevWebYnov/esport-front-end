import { Component } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';
import * as io from 'socket.io-client';
import {UserService} from '../shared/services/user.service';
import {Configuration} from '../shared/app.constants';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, CoolLocalStorage, Configuration]
})
export class AppComponent {
  title = 'app works!';
  socket = io('http://localhost:3100');

  constructor(public userService: UserService, public localStorage: CoolLocalStorage){
    // if(this.localStorage.getItem('userId') != null)
    //   this.loginSocketIO();

  }

  loginSocketIO(){
    var myUser;
    this.userService.GetSingleUserById(this.localStorage.getItem('userId'))
      .subscribe(
        data =>
        {
          myUser = data;
          this.socket.emit('connection');
          this.socket.emit('user-login', data, function () {});
        } ,
        error => {
          console.log(error);
        },
        () => {
          console.log('Get user: ', myUser);
        }
      );
  }
}
