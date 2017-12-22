import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
@Injectable()
export class NewsService {

  private actionUrl: string;
  private headers: HttpHeaders;

  constructor(private _http: HttpClient, private _configuration: Configuration) {
    this.actionUrl = _configuration.ServerWithApiUrl;

    this.headers = new HttpHeaders();
    this.headers.set('Content-Type', 'application/json');
    this.headers.set('Accept', 'application/json');

  }
  public GetAllNews = (): Observable<any> => {
    console.log(this.actionUrl);
    return this._http.get(this.actionUrl + 'news')
      .map(response => response);
  };

}
