import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/Http';
import {Configuration} from "../app.constants";
import {Observable} from "rxjs";
import {Team} from "../models/team";
import { CreateTeamObject } from '../models/utils/create-update-team-object';

@Injectable()
export class TeamService {
  private actionUrl: string;
  private headers: Headers;

  constructor(private _http: Http, private _configuration: Configuration) {
    this.actionUrl = _configuration.ServerWithApiUrl;

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  public GetAllTeam = (): Observable<String> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'teams/')
      .map(response => response.json());
  };

  public GetSingleTeamById = (id: string): Observable<String> => {
    return this._http.get(this.actionUrl + "team/" + id + "/getTeamById")
      .map(response =>response.json());
  };

  public GetSingleTeamByName = (Name: string): Observable<String> => {
    return this._http.get(this.actionUrl + "team/" + Name + "/getTeamByName")
      .map(response =>response.json());
  };

  public AddTeam = (Variable:CreateTeamObject, playerAccountId : string, gameid : string): Observable<Response> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.post(this.actionUrl+"team/"+ playerAccountId+"/addTeam/"+gameid, JsonBody, { headers: this.headers })
      .map((response => response.json()));
  };
  public DeleteTeam = (id: string): Observable<Response> => {
    return this._http.put(this.actionUrl + "team/" + id + "/deleteTeam","");
  };



}
