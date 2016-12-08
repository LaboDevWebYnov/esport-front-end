import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/Http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
import { PlayerAccount } from '../models/player-account';
import { AddNewPlayerAccount } from '../models/utils/create-player-account-object';

@Injectable()
export class PlayerAccountService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private _http: Http, private _configuration: Configuration) {
    this.actionUrl = _configuration.ServerWithApiUrl;

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }


  public GetAllPlayerAccount = (): Observable<String> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'playerAccount/')
      .map(response => response.json());
  };

  public GetSinglePlayerAccountById = (id: string): Observable<String> => {
    return this._http.get(this.actionUrl + "playerAccount/" + id + "/getPlayerAccountById")
      .map(response =>response.json());
  };

  public GetSinglePlayerAccountByUserId = (UserId: string): Observable<String> => {
    return this._http.get(this.actionUrl + "playerAccount/" + UserId + "/getPlayerAccountByUserId")
      .map(response =>response.json());
  };

  public GetSinglePlayerAccountByLogin = (Login: string): Observable<String> => {
    return this._http.get(this.actionUrl + "playerAccount/" + Login + "/getPlayerAccountByLogin")
      .map(response =>response.json());
  };
  public AddPlayerAccount = (Variable:AddNewPlayerAccount): Observable<Response> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.post(this.actionUrl+"playerAccount/"+ Variable.userId+"/addPlayerAccount/"+Variable.gameId, JsonBody, { headers: this.headers })
      .map((response => response.json()));
  };
  public DeletePlayerAccount = (id: string): Observable<Response> => {
    return this._http.put(this.actionUrl + "playerAccount/" + id + "/deletePlayerAccount","");
  };
}
