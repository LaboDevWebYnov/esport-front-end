import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
@Injectable()

@Injectable()
export class ToornamentService {

  private actionUrl: string;
  private headers: HttpHeaders;

  constructor(private _http: HttpClient, private _configuration: Configuration) {
        this.actionUrl = _configuration.ServerWithApiUrl;

    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  // Function
  public generateUrlFromParam = (url: string, params): string => {
    if (Object.keys(params).length > 0) {
      url += '?';

      if (params['discipline']) {
        url += 'discipline=' + params['discipline'] + '&';
      }
      if (params['archived']) {
        url += 'archived=' + params['archived'] + '&';
      }
      if (params['status']) {
        url += '&status=' + params['status'] + '&';
      }
      if (params['featured']) {
        url += 'featured=' + params['featured'] + '&';
      }
      if (params['online']) {
        url += 'online=' + params['online'] + '&';
      }
      if (params['country']) {
        url += 'country=' + params['country'] + '&';
      }
      if (params['after_start']) {
        url += 'after_start=' + params['after_start'] + '&';
      }
      if (params['before_start']) {
        url += 'before_start=' + params['before_start'] + '&';
      }
      if (params['after_end']) {
        url += 'after_end=' + params['after_end'] + '&';
      }
      if (params['before_end']) {
        url += 'before_end=' + params['before_end'] + '&';
      }
      if (params['name']) {
        url += 'name=' + params['name'] + '&';
      }
      if (params['page']) {
        url += 'page=' + params['page'] + '&';
      }
      if (params['has_result']) {
        url += 'has_result=' + params['has_result'] + '&';
      }
      if (params['stage_number']) {
        url += 'stage_number=' + params['stage_number'] + '&';
      }
      if (params['group_number']) {
        url += 'group_number=' + params['group_number'] + '&';
      }
      if (params['round_number']) {
        url += 'round_number=' + params['round_number'] + '&';
      }
      if (params['participant_id']) {
        url += 'participant_id=' + params['participant_id'] + '&';
      }
      if (params['with_games']) {
        url += 'with_games=' + params['with_games'] + '&';
      }
      if (params['with_stats']) {
        url += 'with_stats=' + params['with_stats'] + '&';
      }
      if (params['tournament_ids']) {
        url += '&tournament_ids=' + params['tournament_ids'] + '&';
      }
      if (params['sort']) {
        url += '&sort=' + params['sort'] + '&';
      }
      url = url.substring(0, url.length - 1);
    }
    return url;
  };

  // Oauth
  public postOauthToken = (): Observable<any> => {
    console.log(this.actionUrl);
    return this._http.post(this.actionUrl + 'toornament/oauth/v2/token', null)
      .map(response => response);
  };

  // Tournaments
  public addTournament = (discipline,name,size,participant_type,userId): Observable<any> => {
    console.log(this.actionUrl);
    return this._http.post(this.actionUrl + 'tournaments/addTournament/' + userId, {discipline: discipline, name: name, size: size, participant_type: participant_type})
      .map(response => response);
  };

  public getTournaments = (params): Observable<any> => {
    console.log(this.actionUrl);
    return this._http.get(this.generateUrlFromParam(this.actionUrl + 'getTournaments', params))
      .map(response => response);
  };

  public getTournamentById = (idTournament: string): Observable<any> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'tournaments/' + idTournament)
      .map(response => response);
  };

  public getMyTournaments = (params): Observable<any> => {
    console.log(this.actionUrl);
    return this._http.get(this.generateUrlFromParam(this.actionUrl + 'me/tournaments', params))
      .map(response => response);
  };

  // Matches
  public getMatchesByTournament = (idTournament: string, params): Observable<any> => {
    console.log(this.actionUrl);
    return this._http.get(this.generateUrlFromParam(this.actionUrl + 'tournaments/' + idTournament + '/matches', params))
      .map(response => response);
  };

  public getMatchesByDiscipline = (idDiscipline: string, params): Observable<any> => {
    console.log(this.actionUrl);
    return this._http.get(this.generateUrlFromParam(this.actionUrl + 'tournaments/discipline/' + idDiscipline + '/matches', params))
      .map(response => response);
  };

  public getMatchByTournamentAndId = (idTournament: string, idMatch: string): Observable<any> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'tournaments/' + idTournament + '/matches/' + idMatch)
      .map(response => response);
  };

  public getMatchResult = (idTournament: string, idMatch: string): Observable<any> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'tournaments/' + idTournament + '/matches/' + idMatch + '/result')
      .map(response => response);
  };

  // Games
  public getGamesByMatch = (idTournament: string, idMatch: string, params): Observable<any> => {
    console.log(this.actionUrl);
    return this._http.get(this.generateUrlFromParam(this.actionUrl + 'tournaments/' + idTournament + '/matches/'
      + idMatch + '/games', params))
      .map(response => response);
  };

  public getGameByMatchAndId = (idTournament: string, idMatch: string, idGame: string, params): Observable<any> => {
    console.log(this.actionUrl);
    return this._http.get(this.generateUrlFromParam(this.actionUrl + 'tournaments/' + idTournament + '/matches/'
      + idMatch + '/games/' + idGame, params))
      .map(response => response);
  };

  public getGameResult = (idTournament: string, idMatch: string, idGame: string): Observable<any> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'tournaments/' + idTournament + '/matches/' + idMatch + '/games/' + idGame + '/result')
      .map(response => response);
  };

  // Discipline
  public getDisciplines = (): Observable<any> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'tournaments/disciplines')
      .map(response => response);
  };

  // Participant
  public getParticipantsByTournament = (idTournament: string, params): Observable<any> => {
    console.log(this.actionUrl);
    return this._http.get(this.generateUrlFromParam(this.actionUrl + 'tournaments/' + idTournament + '/participants', params))
      .map(response => response);
  };

  public getParticipantByTournamentAndId = (idTournament: string, idParticipant: string): Observable<any> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'tournaments/' + idTournament + '/participants/' + idParticipant)
      .map(response => response);
  };
}
