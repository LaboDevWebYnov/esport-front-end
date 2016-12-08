/**
 * Created by Thomas on 29/11/2016.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
  public Server: string = "http://localhost:3100/";
  public ApiUrl: string = "api/";
  public ServerWithApiUrl = this.Server + this.ApiUrl;
}
