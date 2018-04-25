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

  private username: string;
  myConvs: any;
  otherConvs: any;
  socket = io.connect('http://localhost:3100');
  message = '';
  roomName = "";
  currentChat: any;
  isTyping = true;
  typingUser = "";
  myFriends: any;

  constructor(private chatService: ChatService, private localStorage: CoolLocalStorage, private userService: UserService) {
    this.FindMyConvs();
    this.FindOtherConvs();
    this.GetMyFriends();

    this.socket.on('return-chat-message', function(msg){
      console.log('chat message', msg);

      let li=document.createElement("li");
      li.appendChild(document.createTextNode(msg.username + ' : ' + msg.content));
      document.getElementById("messages").appendChild(li);
    });

    this.socket.on('typing', function(data){
      console.log(data.username + "typing");
      this.isTyping = false;
      this.typingUser = data.username;
    });

    this.socket.on('stop-typing', function(data){
      console.log(data.username + "stop typing");
      this.isTyping = true;
      this.typingUser = "";
    });
  }

  ngOnInit() {
    document.getElementById("chat").style.visibility = "hidden";
    this.username = this.localStorage.getItem("username");
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

  OnNewChatClick(friend){
    let friendToAdd = friend.username;

    this.chatService.addChat(friendToAdd)
      .subscribe(
        data => {
          console.log(data);
          this.JoinRoom(data._id,this.localStorage.getItem('username'),friend.username);
          this.FindMyConvs();
          this.FindOtherConvs();
        },
        error => {
          console.log(error);
        },
        () => {}
      );
  }

  OnTyping(){
    this.socket.emit("typing");
  }

  OnStopTyping(){
    this.socket.emit("stop-typing");
  }

  GetMyFriends(){
    this.userService.GetSingleUserById(this.localStorage.getItem('userId'))
      .subscribe(
        data => {
          this.myFriends = data.friends;
        },
        error => {
          console.log(error);
        },
        () => {
          console.log('Get friends : ', this.myFriends);
        }
      );
  }

  CreateConv(friend){
    this.chatService.addChat(friend.username)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        },
        () => {}
      );
  }

}
