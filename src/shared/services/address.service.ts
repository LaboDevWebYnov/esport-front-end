import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
import {Address, DisableAddress} from '../models/address';

@Injectable()
export class AddressService {

  private actionUrl: string;
  private headers: HttpHeaders;

  constructor(private _http: HttpClient, private _configuration: Configuration) {
    this.actionUrl = _configuration.ServerWithApiUrl;

    this.headers = new HttpHeaders();
    this.headers.set('Content-Type', 'application/json');
    this.headers.set('Accept', 'application/json');
  }

  public GetAddress = (): Observable<any> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'addresses/getAddresses')
      .map(response => response);
  };

  public GetUserAddressById = (id: string): Observable<any> => {
    return this._http.get(this.actionUrl + "addresses/" + id + "/getUserAddresses")
      .map(response =>response);
  };

  public GetAddressByIdAddress = (addressId: string): Observable<any> => {
    return this._http.get(this.actionUrl + "addresses/" + addressId + "/getAddressById")
      .map(response =>response);
  };

  public AddAddress = (id:string,Variable:Address): Observable<any> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.post(this.actionUrl+"addresses/"+id+"/addAddress", JsonBody, { headers: this.headers })
      .map((response => response));
  };

  public UpdateAddressById = (id:string,addressId:string,Variable:Address): Observable<any> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.put(this.actionUrl + "addresses/" + id + "/updateAddress/" + addressId,JsonBody,{ headers: this.headers });
  };

  public DisableAddressByAddressId = (id:string,Variable:DisableAddress): Observable<any> => {
    let JsonBody = JSON.stringify(Variable);
    return this._http.put(this.actionUrl + "addresses/" + id + "/deactivateAddress",JsonBody,{ headers: this.headers });
  };

  private handleError(error: Object) {
    console.error(error);
  };
}
