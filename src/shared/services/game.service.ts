import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Configuration} from "../app.constants";
import {Observable} from "rxjs";
import {Game} from "../models/game";

@Injectable()
export class GameService {

  private actionUrl: string;
  private headers: HttpHeaders;

  constructor(private _http: HttpClient, private _configuration: Configuration) {
    this.actionUrl = _configuration.ServerWithApiUrl;

    this.headers = new HttpHeaders();
    this.headers.set('Content-Type', 'application/json');
    this.headers.set('Accept', 'application/json');
  }

  //Fonctionne
  public GetAllGames = (): Observable<any> => {
    return this._http.get(this.actionUrl + 'games/')
      .map(response => response);
  };

  //Fonctionne
  public GetGameById = (id: string): Observable<any> => {
    return this._http.get(this.actionUrl + "games/" + id + "/getGameById")
      .map(response =>response);
  };

  //Fonctionne
  public GetGameByName = (name: string): Observable<any> => {
    return this._http.get(this.actionUrl + "games/" + name + "/getGameByName")
      .map(response =>response);
  };

  //Fonctionne
  public GetUserGames = (userId: string): Observable<any> => {
    return this._http.get(this.actionUrl + "games/" + userId + "/getUserGames")
      .map(response =>response);
  };

  //Fonctionne
  public AddGame = (Variable:Game): Observable<any> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.post(this.actionUrl+"games/addGame", Variable, { headers: this.headers })
      .map((response => response));
  };

  //Fonctionne
  public DeleteGame = (id: string): Observable<any> => {
    return this._http.put(this.actionUrl + "games/" + id + "/deleteGame","");
  };


  public ChangeGameInformation = (id:string,Variable:Game): Observable<any> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.put(this.actionUrl + "games/" + id + "/updateGame",Variable,{ headers: this.headers });
  };




}
