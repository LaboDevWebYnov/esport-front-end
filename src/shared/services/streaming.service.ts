import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';

@Injectable()
export class StreamingService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private _http: Http, private _configuration: Configuration) {
    this.actionUrl = _configuration.ServerWithApiUrl;

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }

  public getLiveStreaming = (): Observable<String> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'streaming/getLiveStreaming')
      .map(response => response.json());
  };

  public getStreamingByName = (twitchUser: string): Observable<String> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'streaming/'+twitchUser+'/getStreamingByName')
      .map(response => response.json());
  };

  public getStreamingByLikeName = (partialTwitchUser: string): Observable<String> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'streaming/'+ partialTwitchUser +'/getStreamingByLikeName')
      .map(response => response.json());
  };
}
