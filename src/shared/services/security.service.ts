import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {Configuration} from '../app.constants';
import {AuthObject} from '../models/utils/auth-object';

@Injectable()
export class SecurityService {

  private actionUrl: string;
  private headers: HttpHeaders;

  constructor(private _http: HttpClient, private _configuration: Configuration) {
    this.actionUrl = _configuration.ServerWithApiUrl;

    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  //Good
  public verifyEmail = (email: string, token: string): Observable<any> => {
    return this._http.get(this.actionUrl + 'user/verify/' + email+'?t='+token)
      .map(response => response)
  };

  public isVerified = (email: string, token: string): Observable<any> => {
    return this._http.get(this.actionUrl + 'user/isVerified/' + email)// + '?t=' + token)
      .map(response => response)
  };

  //Good
  public auth = (authObject: AuthObject): Observable<any> => {
    let JsonBody = JSON.stringify(authObject);
    return this._http.post(this.actionUrl + 'auth', JsonBody, {headers: this.headers})
      .map((response => response))
  };
}
