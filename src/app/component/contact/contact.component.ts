import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/services/user.service';
import { CoolLocalStorage } from 'angular2-cool-storage';
import {forEach} from '@angular/router/src/utils/collection';
import {Configuration} from '../../../shared/app.constants';
import * as io from 'socket.io-client';
import {ChatService} from '../../../shared/services/chat.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ChatService,Configuration]
})
export class ContactComponent implements OnInit {

  myConvs: any;
  otherConvs: any;
  socket = io.connect('http://localhost:3100');
  message = '';
  roomName = "";
  currentChat: any;

  constructor(public chatService: ChatService, public localStorage: CoolLocalStorage) {
    this.FindMyConvs();
    this.FindOtherConvs();

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

  FindMyConvs() {
    this.chatService.getChatByUser1(this.localStorage.getItem('username'))
      .subscribe(
        data => {
          this.myConvs = data;
        },
        error => {
          console.log(error);
        },
        () => {
          console.log('Get my convs: ', this.myConvs);
        }
      );
  }

  FindOtherConvs() {
    this.chatService.getChatByUser2(this.localStorage.getItem('username'))
      .subscribe(
        data => {
          this.otherConvs = data;
        },
        error => {
          console.log(error);
        },
        () => {
          console.log('Get convs where i am: ', this.otherConvs);
        }
      );
  }

  JoinRoom(chatId, user1, user2){
    this.roomName = user1 + " / " + user2;

    let data = {
      room: chatId,
      username: localStorage.getItem('username')
    };
    this.socket.emit('join-room', data);

    this.chatService.getMessagesByChat(chatId).subscribe(
      data => {
        this.currentChat = data;
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('Get current messages: ', this.currentChat);
      }
    );

    document.getElementById("chat").style.visibility = 'visible';
  }

  SendMessage(){
    let data = {
      username: localStorage.getItem('username'),
      message: this.message
    };
    this.socket.emit('chat-message', data);
    this.message="";
  }

  OnNewChatClick(){
    let friendToAdd = (<HTMLInputElement>document.getElementById("friendAddChat")).value;

    this.chatService.addChat(friendToAdd)
      .subscribe(
        data => {
          this.myConvs = data;
        },
        error => {
          console.log(error);
        },
        () => {
          console.log('Get convs where i am: ', this.otherConvs);
        }
      );
  }

}
