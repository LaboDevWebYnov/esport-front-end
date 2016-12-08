import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/Http';
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

  //test a faire
  public verifyEmail = (email: string): Observable<String> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'user/verify/' + email)
      .map(response => response.json())
  };

  //test a faire
  public auth = (authObject: AuthObject): Observable<Response> => {
    let JsonBody = JSON.stringify({authObject});
    return this._http.post(this.actionUrl + "auth", JsonBody, {headers: this.headers})
      .map((response => response.json()))
  };
}
