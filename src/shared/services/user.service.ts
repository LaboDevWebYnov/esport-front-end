import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/Http';
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
  private headers: Headers;

  constructor(private _http: Http, private _configuration: Configuration) {
    this.actionUrl = _configuration.ServerWithApiUrl;

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  //User request


  //Fonctionne
  public GetAllUsers = (): Observable<String> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'users/')
      .map(response => response.json());
  };

  //Fonctionne
  public GetSingleUserById = (id: string): Observable<String> => {
    return this._http.get(this.actionUrl + "users/" + id + "/getUserById")
      .map(response =>response.json());
  };

  //Fonctionne
  public GetSingleUserByUsername = (Username: string): Observable<String> => {
    return this._http.get(this.actionUrl + "users/" + Username + "/getUserByUsername")
      .map(response =>response.json());
  };

  //Fonctionne
  public Delete = (id: string): Observable<Response> => {
    return this._http.put(this.actionUrl + "users/" + id + "/deleteUser","");
  };

  //Fonctionne
  public ChangeUserPassword = (id: string,Variable:ChangePasswordObject): Observable<Response> => {
    let JsonBody = JSON.stringify(Variable);
    console.log(JsonBody);
    return this._http.put(this.actionUrl + "users/" + id + "/updatePassword",JsonBody,{ headers: this.headers });
  };

  //Fonctionne
  public ChangeUserEmail = (id: string,Variable:ChangeEmailObject): Observable<Response> => {
    let JsonBody = JSON.stringify(Variable);
    console.log(JsonBody);
    return this._http.put(this.actionUrl + "users/" + id + "/updateEmail",JsonBody,{ headers: this.headers });
  };

  //Fonctionne
  public ChangeUserInformation = (id:string,Variable:User): Observable<Response> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.put(this.actionUrl + "users/" + id + "/updateUser",JsonBody,{ headers: this.headers });
  };

  //Fonctionne
  public AddUser = (Variable:User): Observable<Response> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.post(this.actionUrl+"users/addUser", JsonBody, { headers: this.headers })
      .map((response => response.json()));
  };

  private handleError(error: Object) {
    console.error(error);
  };
}
