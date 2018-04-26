import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/services/user.service';
import { CoolLocalStorage } from 'angular2-cool-storage';
import {forEach} from '@angular/router/src/utils/collection';
import {Configuration} from '../../../shared/app.constants';
import * as io from 'socket.io-client';
import {ChatService} from '../../../shared/services/chat.service';
import {TeamService} from '../../../shared/services/team.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ChatService,Configuration,UserService,TeamService]
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
  myTeams: any;
  myUserId = this.localStorage.getItem('userId');
  myUsername = this.localStorage.getItem('username');

  constructor(private chatService: ChatService, private localStorage: CoolLocalStorage, private userService: UserService, private teamService: TeamService) {
    this.FindMyConvs();
    this.FindOtherConvs();
    this.GetMyFriends();
    this.FindMyTeam();

    this.socket.on('return-chat-message', function(msg){
      console.log('chat message', msg);

      let li=document.createElement("li");
      li.appendChild(document.createTextNode(msg.username + ' : ' + msg.content));
      document.getElementById("messages").appendChild(li);
    });

    this.socket.on('return-typing', function(data){
      console.log("typing", data);
      this.isTyping = true;
      this.typingUser = data.username;
    });

    this.socket.on('return-stop-typing', function(data){
      console.log("stop typing", data);
      this.isTyping = false;
      this.typingUser = "";
    });
  }

  ngOnInit() {
    document.getElementById("chat").style.visibility = "hidden";
    this.username = this.myUsername;
  }

  FindMyConvs() {
    this.chatService.getChatByUser1(this.myUsername)
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
    this.chatService.getChatByUser2(this.myUsername)
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

  FindMyTeam(){
    this.teamService.GetTeamsByUserId(this.myUserId)
      .subscribe(
      data => {
        this.myTeams = data;
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('Get teams where i am: ', this.myTeams);
      }
    );
  }

  JoinRoom(chatId, user1, user2){
    this.roomName = user1 + " / " + user2;

    let data = {
      room: chatId,
      username: this.myUsername
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
      username: this.myUsername,
      message: this.message
    };
    this.socket.emit('chat-message', data);
    this.message="";
  }

  OnNewChatClick(friend){
    let friendToAdd = friend.username;
    var alreadyExist = false;

    this.myConvs.forEach(item => {
      if(item.user1 == this.myUsername && item.user2 == friendToAdd){
        alreadyExist = true;
        this.JoinRoom(item._id, item.user1, item.user2);
      }
    });
    this.otherConvs.forEach(item => {
      if(item.user1 == friendToAdd && item.user2 == this.myUsername){
        alreadyExist = true;
        this.JoinRoom(item._id, item.user1, item.user2);
      }
    });

    if(!alreadyExist){
      this.chatService.addChat(friendToAdd)
        .subscribe(
          data => {
            console.log(data);
            this.JoinRoom(data._id,this.myUsername,friend.username);
            this.FindMyConvs();
            this.FindOtherConvs();
          },
          error => {
            console.log(error);
          },
          () => {}
        );
    }
  }

  OnTyping(){
    this.socket.emit("typing");
  }

  OnStopTyping(){
    this.socket.emit("stop-typing");
  }

  GetMyFriends(){
    this.userService.GetSingleUserById(this.myUserId)
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
}
