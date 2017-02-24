import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {Configuration} from '../app.constants';
import {AuthObject} from '../models/utils/auth-object';

@Injectable()
export class SecurityService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private _http: Http, private _configuration: Configuration) {
    this.actionUrl = _configuration.ServerWithApiUrl;

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  //Good
  public verifyEmail = (email: string, token: string): Observable<String> => {
    return this._http.get(this.actionUrl + 'user/verify/' + email+'?t='+token)
      .map(response => response.json())
  };

  public isVerified = (email: string, token: string): Observable<String> => {
    return this._http.get(this.actionUrl + 'user/isVerified/' + email)// + '?t=' + token)
      .map(response => response.json())
  };

  //Good
  public auth = (authObject: AuthObject): Observable<Response> => {
    let JsonBody = JSON.stringify(authObject);
    return this._http.post(this.actionUrl + "auth", JsonBody, {headers: this.headers})
      .map((response => response.json()))
  };
}
