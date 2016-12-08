import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/Http';
import {Configuration} from "../app.constants";
import {Observable} from "rxjs";
import {Game} from "../models/game";

@Injectable()
export class GameService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private _http: Http, private _configuration: Configuration) {
    this.actionUrl = _configuration.ServerWithApiUrl;

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  //Fonctionne
  public GetAllGames = (): Observable<String> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'games/')
      .map(response => response.json());
  };

  //Fonctionne
  public GetGameById = (id: string): Observable<String> => {
    return this._http.get(this.actionUrl + "games/" + id + "/getGameById")
      .map(response =>response.json());
  };

  //Fonctionne
  public GetGameByName = (name: string): Observable<String> => {
    return this._http.get(this.actionUrl + "games/" + name + "/getGameByName")
      .map(response =>response.json());
  };

  //Fonctionne
  public AddGame = (Variable:Game): Observable<Response> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.post(this.actionUrl+"games/addGame", JsonBody, { headers: this.headers })
      .map((response => response.json()));
  };

  //Fonctionne
  public DeleteGame = (id: string): Observable<Response> => {
    return this._http.put(this.actionUrl + "games/" + id + "/deleteGame","");
  };


  public ChangeGameInformation = (id:string,Variable:Game): Observable<Response> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.put(this.actionUrl + "games/" + id + "/updateGame",JsonBody,{ headers: this.headers });
  };




}
