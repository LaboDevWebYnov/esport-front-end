import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
import { ChangePasswordObject } from '../models/utils/change-password-object';
import { ChangeEmailObject } from '../models/utils/change-email-object';
import { User } from '../models/user';
@Injectable()
export class UserService {

  private actionUrl: string;
  private headers: HttpHeaders;

  constructor(private _http: HttpClient, private _configuration: Configuration) {
    this.actionUrl = _configuration.ServerWithApiUrl;

    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  // User request


  // Fonctionne
  public GetAllUsers = (): Observable<any> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'users/')
      .map(response => response);
  };

  // Fonctionne
  public GetSingleUserById = (id: string): Observable<any> => {
    return this._http.get(this.actionUrl + 'users/' + id + '/getUserById')
      .map(response => response);
  };

  // Fonctionne
  public GetSingleUserByUsername = (Username: string): Observable<any> => {
    return this._http.get(this.actionUrl + 'users/' + Username + '/getUserByUsername')
      .map(response => response);
  };

  // Fonctionne
  public Delete = (id: string): Observable<any> => {
    return this._http.put(this.actionUrl + 'users/' + id + '/deleteUser', '');
  };

  // Fonctionne
  public ChangeUserPassword = (id: string, Variable: ChangePasswordObject): Observable<any> => {
    let JsonBody = JSON.stringify(Variable);
    console.log(JsonBody);
    return this._http.put(this.actionUrl + 'users/' + id + '/updatePassword', Variable, { headers: this.headers });
  };

  // Fonctionne
  public ChangeUserEmail = (id: string, Variable: ChangeEmailObject): Observable<any> => {
    let JsonBody = JSON.stringify(Variable);
    console.log(JsonBody);
    return this._http.put(this.actionUrl + 'users/' + id + '/updateEmail', Variable, { headers: this.headers });
  };

  // Fonctionne
  public ChangeUserInformation = (id: string, Variable: User): Observable<any> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.put(this.actionUrl + 'users/' + id + '/updateUser', Variable, { headers: this.headers });
  };

  // Fonctionne
  public AddUser = (Variable: User): Observable<any> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.post(this.actionUrl + 'users/addUser', Variable, { headers: this.headers })
      .map((response => response));
  };

  /*private handleError(error: Object) {
    console.error(error);
  };*/
}
