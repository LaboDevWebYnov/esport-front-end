import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';

@Injectable()
export class ToornamentService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private _http: Http, private _configuration: Configuration) {
    this.actionUrl = _configuration.ServerWithApiUrl;

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  // Oauth
  public postOauthToken = (): Observable<String> => {
    console.log(this.actionUrl);
    return this._http.post(this.actionUrl + 'toornament/oauth/v2/token', null)
      .map(response => response.json());
  };

  // Tournaments
  public getTournaments = (param): Observable<String> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'getTournaments')
      .map(response => response.json());
  };

  public getTournamentById = (idTournament: string): Observable<String> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'tournaments/' + idTournament)
      .map(response => response.json());
  };

  public getMyTournaments = (param): Observable<String> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'me/tournaments')
      .map(response => response.json());
  };

  // Matches
  public getMatchesByTournament = (idTournament: string): Observable<String> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'tournaments/' + idTournament + '/matches')
      .map(response => response.json());
  };

  public getMatchesByDiscipline = (idDiscipline: string): Observable<String> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'tournaments/discipline/' + idDiscipline + '/matches')
      .map(response => response.json());
  };

  public getMatchByTournamentAndId = (idTournament: string, idMatch: string): Observable<String> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'tournaments/' + idTournament + '/matches/' + idMatch)
      .map(response => response.json());
  };

  public getMatchResult = (idTournament: string, idMatch: string): Observable<String> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'tournaments/' + idTournament + '/matches/' + idMatch + '/result')
      .map(response => response.json());
  };

  // Games
  public getGamesByMatch = (idTournament: string, idMatch: string): Observable<String> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'tournaments/' + idTournament + '/matches/' + idMatch + '/games')
      .map(response => response.json());
  };

  public getGameByMatchAndId = (idTournament: string, idMatch: string, idGame: string): Observable<String> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'tournaments/' + idTournament + '/matches/' + idMatch + '/games/' + idGame)
      .map(response => response.json());
  };

  public getGameResult = (idTournament: string, idMatch: string, idGame: string): Observable<String> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'tournaments/' + idTournament + '/matches/' + idMatch + '/games/' + idGame + '/result')
      .map(response => response.json());
  };

  // Discipline
  public getDisciplines = (): Observable<String> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'tournaments/discipline')
      .map(response => response.json());
  };

  // Participant
  public getParticipantsByTournament = (idTournament: string): Observable<String> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'tournaments/' + idTournament + '/participants')
      .map(response => response.json());
  };

  public getParticipantByTournamentAndId = (idTournament: string, idParticipant: string): Observable<String> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'tournaments/' + idTournament + '/participants/' + idParticipant)
      .map(response => response.json());
  };
}
