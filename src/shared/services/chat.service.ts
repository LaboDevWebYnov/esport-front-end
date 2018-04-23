import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
@Injectable()
export class ChatService {

  private actionUrl: string;
  private headers: HttpHeaders;

  constructor(private _http: HttpClient, private _configuration: Configuration) {
    this.actionUrl = _configuration.ServerWithApiUrl;

    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public getChatByUser1 = (username: string): Observable<any> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'chat/user1/' + username)
      .map(response => response);
  };

  public getChatByUser2 = (username: string): Observable<any> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'chat/user2/' + username)
      .map(response => response);
  };

  public getMessagesByChat = (chatId: string): Observable<any> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'message/chat/' + chatId)
      .map(response => response);
  };

  public addChat = (user2: string): Observable<any> => {
    var user1 = localStorage.getItem("username");
    console.log(this.actionUrl);
    return this._http.post(this.actionUrl + 'chat/add', { user1: user1, user2: user2 })
      .map(response => response);
  };
}
