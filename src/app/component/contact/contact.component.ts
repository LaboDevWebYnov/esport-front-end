import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/services/user.service';
import { CoolLocalStorage } from 'angular2-cool-storage';
import {forEach} from '@angular/router/src/utils/collection';
import {Configuration} from '../../../shared/app.constants';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [UserService,Configuration]
})
export class ContactComponent implements OnInit {

  myFriends: any;
  socket = io('http://localhost:3000');
  message = '';
  roomName = "";


  constructor(public userService: UserService, public localStorage: CoolLocalStorage) {
    this.FindFriends();

    this.socket.on('return-chat-message', function(msg){
      console.log('chat message', msg);

      var li=document.createElement("li");
      li.appendChild(document.createTextNode(msg.username + ' : ' + msg.content));
      document.getElementById("messages").appendChild(li);
    });
  }

  ngOnInit() {
    document.getElementById("chat").style.visibility = "hidden";

  }

  FindFriends() {
    this.userService.GetSingleUserById(this.localStorage.getItem('userId'))
      .subscribe(
        data => {
          this.myFriends = data.friends;
        },
        error => {
          console.log(error);
        },
        () => {
          console.log('Get friends: ', this.myFriends);
        }
      );
  }



  JoinRoom(friendId){
      /*if(this.roomName != "")
        this.socket.emit('disconnect', this.roomName);*/

    this.socket.emit('join-room', friendId.toString(), localStorage.getItem('username'));
    //this.roomName = friendId.toString();
    this.roomName = "room1";
    document.getElementById("messages").innerHTML = "";
    document.getElementById("chat").style.visibility = 'visible';

  }

  SendMessage(){


    this.socket.emit('chat-message', this.message, localStorage.getItem('username'));
    this.message="";


  }


}
