import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
import {Address, DisableAddress} from '../models/address';

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
    return this._http.get(this.actionUrl + 'addresses/getAddresses')
      .map(response => response.json());
  };

  public GetUserAddressById = (id: string): Observable<String> => {
    return this._http.get(this.actionUrl + "addresses/" + id + "/getUserAddresses")
      .map(response =>response.json());
  };

  public GetAddressByIdAddress = (addressId: string): Observable<String> => {
    return this._http.get(this.actionUrl + "addresses/" + addressId + "/getAddressById")
      .map(response =>response.json());
  };

  public AddAddress = (id:string,Variable:Address): Observable<Response> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.post(this.actionUrl+"addresses/"+id+"/addAddress", JsonBody, { headers: this.headers })
      .map((response => response.json()));
  };

  public UpdateAddressById = (id:string,addressId:string,Variable:Address): Observable<Response> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.put(this.actionUrl + "addresses/" + id + "/updateAddress/" + addressId,JsonBody,{ headers: this.headers });
  };

  public DisableAddressByAddressId = (id:string,Variable:DisableAddress): Observable<Response> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.put(this.actionUrl + "addresses/" + id + "/deactivateAddress",JsonBody,{ headers: this.headers });
  };

  private handleError(error: Object) {
    console.error(error);
  };
}
