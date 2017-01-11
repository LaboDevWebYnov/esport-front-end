import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/Http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {Configuration} from '../app.constants';
import { User } from '../models/user';
import { SignupUser } from '../models/utils/signup-user';



@Injectable()
export class RegistrationService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private _http: Http, private _configuration: Configuration) {
    this.actionUrl = _configuration.ServerWithApiUrl;

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public registerUser = (Variable:SignupUser): Observable<Response> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.post(this.actionUrl+"register/", JsonBody, { headers: this.headers })
      .map((response => response.json()));
  };

  public registerUserMainInfo = (id:string,Variable:User): Observable<Response> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.put(this.actionUrl + "register/" + id + "/step1",JsonBody,{ headers: this.headers });
  };

  public verifyEmail = (email: string, token: string): Observable<String> => {
    return this._http.get(this.actionUrl + 'register/' + email+'/step0?t='+token)
      .map(response => response.json())
  };

  public isVerified = (email: string, token: string): Observable<String> => {
    return this._http.get(this.actionUrl + 'register/'+email+'/isVerified?t=' + token)
      .map(response => response.json())
  };

}
