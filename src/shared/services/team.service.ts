import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
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

  public GetTeamsByName = (Name: string): Observable<String> => {
    return this._http.get(this.actionUrl + "teams/" + Name + "/getTeamsByName")
      .map(response =>response.json());
  };

  public GetTeamsByLikeName = (Name: string): Observable<String> => {
    return this._http.get(this.actionUrl + "teams/" + Name + "/getTeamsByLikeName")
      .map(response =>response.json());
  };

  public GetTeamsByUserId = (id: string): Observable<String> => {
    return this._http.get(this.actionUrl + "teams/" + id )
      .map(response =>response.json());
  };

  public GetSingleTeamById = (id: string): Observable<String> => {
    return this._http.get(this.actionUrl + "teams/" + id + "/getTeamById")
      .map(response =>response.json());
  };

  public GetSingleTeamByName = (Name: string): Observable<String> => {
    return this._http.get(this.actionUrl + "teams/" + Name + "/getTeamByName")
      .map(response =>response.json());
  };

  public AddTeam = (Variable:CreateTeamObject, playerAccountId : string, gameid : string): Observable<Response> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.post(this.actionUrl+"/teams/"+ playerAccountId+"/addTeam/"+gameid, JsonBody, { headers: this.headers })
      .map((response => response.json()));
  };
  public DeleteTeam = (id: string): Observable<Response> => {
    return this._http.put(this.actionUrl + "teams/" + id + "/deleteTeam","");
  };
  public registerTeamMainInfo = (userId:string, Variable:CreateTeamObject, gameid : string): Observable<Response> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.post(this.actionUrl + "teams/" + userId + "/addTeam/"+gameid,JsonBody,{ headers: this.headers });
  };
  public addPlayerAccountInTeam = (teamId : string, playerAccount:string ): Observable<Response> => {

    return this._http.put(this.actionUrl + "teams/" + teamId + "/addPlayer/"+playerAccount,{ headers: this.headers });
  };

  public updateTeamName = (teamId: string, maTeam: CreateTeamObject): Observable<Response> => {
    let JsonBody = JSON.stringify(maTeam);
    return this._http.put(this.actionUrl + "teams/" + teamId + "/updateTeam",JsonBody,{ headers: this.headers });
  }



}
