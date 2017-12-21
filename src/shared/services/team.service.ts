import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Configuration} from "../app.constants";
import {Observable} from "rxjs";
import {Team} from "../models/team";
import { CreateTeamObject } from '../models/utils/create-update-team-object';
@Injectable()
export class TeamService {
  private actionUrl: string;
  private headers: HttpHeaders;

  constructor(private _http: HttpClient, private _configuration: Configuration) {
    this.actionUrl = _configuration.ServerWithApiUrl;

    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  public GetAllTeam = (): Observable<any> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'teams/')
      .map(response => response);
  };

  public GetTeamsByName = (Name: string): Observable<any> => {
    return this._http.get(this.actionUrl + "teams/" + Name + "/getTeamsByName")
      .map(response =>response);
  };

  public GetTeamsByLikeName = (Name: string): Observable<any> => {
    return this._http.get(this.actionUrl + "teams/" + Name + "/getTeamsByLikeName")
      .map(response =>response);
  };

  public GetTeamsByUserId = (id: string): Observable<any> => {
    return this._http.get(this.actionUrl + "teams/" + id )
      .map(response =>response);
  };

  public GetTeamsByGameId = (id: string): Observable<any> => {
    return this._http.get(this.actionUrl + "teams/games/" + id )
      .map(response =>response);
  };

  public GetSingleTeamById = (id: string): Observable<any> => {
    return this._http.get(this.actionUrl + "teams/" + id + "/getTeamById")
      .map(response =>response);
  };

  public GetSingleTeamByName = (Name: string): Observable<any> => {
    return this._http.get(this.actionUrl + "teams/" + Name + "/getTeamByName")
      .map(response =>response);
  };

  public AddTeam = (Variable:CreateTeamObject, playerAccountId : string, gameid : string): Observable<any> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.post(this.actionUrl+"/teams/"+ playerAccountId+"/addTeam/"+gameid, JsonBody, { headers: this.headers })
      .map((response => response));
  };
  public DeleteTeam = (id: string): Observable<any> => {
    return this._http.put(this.actionUrl + "teams/" + id + "/deleteTeam","");
  };
  public registerTeamMainInfo = (userId:string, Variable:CreateTeamObject, gameid : string): Observable<any> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.post(this.actionUrl + "teams/" + userId + "/addTeam/"+gameid,JsonBody,{ headers: this.headers });
  };
  public addPlayerAccountInTeam = (teamId : string, playerAccount:string ): Observable<any> => {

    return this._http.put(this.actionUrl + "teams/" + teamId + "/addPlayer/"+playerAccount,{ headers: this.headers });
  };

  public updateTeamName = (teamId: string, maTeam: CreateTeamObject): Observable<any> => {
    let JsonBody = JSON.stringify(maTeam);
    return this._http.put(this.actionUrl + "teams/" + teamId + "/updateTeam",JsonBody,{ headers: this.headers });
  }



}
