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
export class AddressService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private _http: Http, private _configuration: Configuration) {
    this.actionUrl = _configuration.ServerWithApiUrl;

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }



  public GetAddress = (): Observable<String> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'users/getAddresses')
      .map(response => response.json());
  };

  public GetUserAddressById = (id: string): Observable<String> => {
    return this._http.get(this.actionUrl + "addresses/" + id + "/getUserAddresses")
      .map(response =>response.json());
  };

  public GetAddressByIdAdress = (addressId: string): Observable<String> => {
    return this._http.get(this.actionUrl + "addresses/" + addressId + "/getAddressById")
      .map(response =>response.json());
  };

  public AddAddress = (id:string,Variable:User): Observable<Response> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.post(this.actionUrl+"address/"+id+"/addAddress", JsonBody, { headers: this.headers })
      .map((response => response.json()));
  };

  public UpdateAddressById = (id:string,Variable:User): Observable<Response> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.put(this.actionUrl + "addresses/" + id + "/updateUser",JsonBody,{ headers: this.headers });
  };

  public UpdateAddressByAddressId = (id:string,Variable:User): Observable<Response> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.put(this.actionUrl + "addresses/" + id + "/updateUser",JsonBody,{ headers: this.headers });
  };

  private handleError(error: Object) {
    console.error(error);
  };
}
