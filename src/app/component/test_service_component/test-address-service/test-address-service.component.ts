import { Component, OnInit } from '@angular/core';

import { AddressService } from "../../../../shared/services/address.service";
import { Address } from "../../../../shared/models/address";
import { DisableAddress } from "../../../../shared/models/address";
import { Configuration } from '../../../../shared/app.constants';
import { FormBuilder, Validators } from '@angular/forms';
import {stringDistance} from "codelyzer/util/utils";

@Component({
  selector: 'app-test-address-service',
  templateUrl: './test-address-service.component.html',
  styleUrls: ['./test-address-service.component.css'],
  providers:[AddressService,Configuration]
})

export class TestAddressServiceComponent implements OnInit {

  addressApiJson: Object;
  addressGetByID: Object;
  addressGetByIdAddress: Object;
  response: Object;

  Address1: Address={
    postCode: 0,
    city: "",
    country: "",
    line: ""
  };

  disableAddress: DisableAddress={
    active: false
  }

  constructor(private addressServiceInstance: AddressService) {

  }

  private getAllItemsAddress(): void{
    this.addressServiceInstance
      .GetAddress()
      .subscribe(
        data => this.addressApiJson = data,
        error => console.log(error),
        () => console.log('get All Address Items complete', this.addressApiJson)
      );
  }

  private getItemAddressById(idUser: string): void{
    this.addressServiceInstance
      .GetUserAddressById(idUser)/*583a9d3b95ecb33490f49896*/
      .subscribe(
        data => this.addressGetByID = data,
        error => console.log(error),
        () => console.log('get One Address by ID complete', this.addressGetByID)
      );
  }

  private getItemAddressByIdAddress(): void {
    var idAddress = (<HTMLInputElement>document.getElementById('idAddress')).value;

    this.addressServiceInstance
      .GetAddressByIdAddress(idAddress)/*5729cc0b8613b6dc11b1fdd0*/
      .subscribe(
        data => this.addressGetByIdAddress = data,
        error => console.log(error),
        () => console.log('get One Address by Address ID complete', this.addressApiJson)
      );
  }

  private addAddress(idUser:string): void {
    var idUser = (<HTMLInputElement>document.getElementById('UserID')).value;
    this.Address1.postCode = parseInt((<HTMLInputElement>document.getElementById('postCode')).value);
    this.Address1.city = (<HTMLInputElement>document.getElementById('city')).value;
    this.Address1.country = (<HTMLInputElement>document.getElementById('country')).value;
    this.Address1.line = (<HTMLInputElement>document.getElementById('line')).value;

    console.log(JSON.stringify(this.Address1));
    this.addressServiceInstance
      .AddAddress(idUser,this.Address1)
      .subscribe(
        data => this.response = data,
        error => console.log(error,this.response),
        () => console.log('Add Address complete', this.response)
      );
  }

  private ChangeAddressById(): void {
    var idUser = (<HTMLInputElement>document.getElementById('idUserChange')).value;
    var idAddress = (<HTMLInputElement>document.getElementById('idAddressChange')).value;
    this.Address1.postCode = parseInt((<HTMLInputElement>document.getElementById('postCodeChange')).value);
    this.Address1.city = (<HTMLInputElement>document.getElementById('cityChange')).value;
    this.Address1.country = (<HTMLInputElement>document.getElementById('countryChange')).value;
    this.Address1.line = (<HTMLInputElement>document.getElementById('lineChange')).value;

    this.addressServiceInstance
      .UpdateAddressById(idUser, idAddress,this.Address1)
      .subscribe(
        data => this.response = data,
        error => console.log(error),
        () => console.log('change Address User by ID complete', this.response)
      );
  }

  private DisableAddressByIdAddress(): void {
    var idAddress = (<HTMLInputElement>document.getElementById('idAddressDis')).value;

    this.addressServiceInstance
      .DisableAddressByAddressId(idAddress,this.disableAddress)
      .subscribe(
        data => this.response = data,
        error => console.log(error),
        () => console.log('change Address user by Address ID complete', this.response)
      );
  }

  ngOnInit() {
    this.getAllItemsAddress();
    //this.getItemAddressById();
    //this.getItemAddressByIdAddress();
    //this.addAddress();
    //this.ChangeAddressById();
    //this.DisableAddressByIdAddress();
  }

  public onSelectAddress(id : string):void{
    console.log("Id " +id);
    this.getItemAddressById(id);
  }
}
