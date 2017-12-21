import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
import { PlayerAccount } from '../models/player-account';
import { AddNewPlayerAccount } from '../models/utils/create-player-account-object';

@Injectable()
export class PlayerAccountService {

  private actionUrl: string;
  private headers: HttpHeaders;

  constructor(private _http: HttpClient, private _configuration: Configuration) {
    this.actionUrl = _configuration.ServerWithApiUrl;

    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }

  public GetAllPlayerAccount = (): Observable<String> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'playerAccounts/')
      .map(response => response);
  };

  public GetSinglePlayerAccountById = (id: string): Observable<String> => {
    return this._http.get(this.actionUrl + 'playerAccounts/' + id + '/getPlayerAccountById')
      .map(response => response);
  };

  public GetSinglePlayerAccountByUserId = (UserId: string): Observable<String> => {
    return this._http.get(this.actionUrl + 'playerAccounts/' + UserId + '/getPlayerAccountByUserId')
      .map(response => response);
  };
  public GetPlayerAccountByUserIdByGame = (UserId: string, GameId: string): Observable<String> => {
    return this._http.get(this.actionUrl + 'playerAccounts/' + UserId + '/game/' + GameId)
      .map(response => response);
  };
  public GetPlayerAccountByGame = (GameId: string): Observable<String> => {
    return this._http.get(this.actionUrl + 'playerAccounts/game/' + GameId)
      .map(response => response);
  };

  public GetSinglePlayerAccountByLogin = (Login: string): Observable<String> => {
    return this._http.get(this.actionUrl + 'playerAccounts/' + Login + '/getPlayerAccountByLogin')
      .map(response => response);
  };
  public AddPlayerAccount = (Variable: AddNewPlayerAccount, userid: string, gameid: string): Observable<Response> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.post(this.actionUrl + 'playerAccounts/' + userid + '/addPlayerAccount/' + gameid, JsonBody, { headers: this.headers })
      .map((response => response));
  };
  public DeletePlayerAccount = (id: string): Observable<Response> => {
    return this._http.put(this.actionUrl + 'playerAccounts/' + id + '/deletePlayerAccount', '');
  };

  public UpdatePlayerAccount = (id: string, Variable: AddNewPlayerAccount): Observable<Response> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.put(this.actionUrl + 'playerAccounts/' + id + '/updatePlayerAccount', JsonBody, { headers: this.headers });
  };
}
