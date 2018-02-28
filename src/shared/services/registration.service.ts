import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {Configuration} from '../app.constants';
import { User } from '../models/user';
import { SignupUser } from '../models/utils/signup-user';
import {RegisterUserObject} from '../models/utils/register-user-object';



@Injectable()
export class RegistrationService {

  private actionUrl: string;
  private headers: HttpHeaders;

  constructor(private _http: HttpClient, private _configuration: Configuration) {
    this.actionUrl = _configuration.ServerWithApiUrl;

    this.headers = new HttpHeaders();
    this.headers.set('Content-Type', 'application/json');
    this.headers.set('Accept', 'application/json');
  }

  public registerUser = (Variable:SignupUser): Observable<any> => {
    //let JsonBody = JSON.stringify(Variable);
    return this._http.post(this.actionUrl+"register/", Variable, { headers: this.headers })
      ;
  };

  public registerUserMainInfo = (id:string, Variable:RegisterUserObject): Observable<any> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.put(this.actionUrl + "register/" + id + "/step1",Variable,{ headers: this.headers });
  };

  public completeRegistration = (id:string, token: string): Observable<any> => {
    return this._http.put(this.actionUrl + "register/" + id + "/completeRegistration?t="+token,null,{ headers: this.headers });

  };

  public cancelRegistration = (id:string, token: string): Observable<any> => {
    return this._http.delete(this.actionUrl + "register/" + id + "/cancelRegistration?t="+token);
  };

  public verifyEmail = (email: string, token: string): Observable<any> => {
    return this._http.get(this.actionUrl + 'register/' + email+'/step0?t='+token)
      .map(response => response)
  };

  public isVerified = (email: string, token: string): Observable<any> => {
    return this._http.get(this.actionUrl + 'register/'+email+'/isVerified?t=' + token)
      .map(response => response)
  };

}
