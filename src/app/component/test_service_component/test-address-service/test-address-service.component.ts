import { Component, OnInit } from '@angular/core';

import { AddressService } from "../../../../shared/services/address.service";
import { Address } from "../../../../shared/models/address";
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
    postCode: 15,
    city: "toto",
    country: "tata",
    line: "titi"
  };

  constructor(private addressServiceInstance: AddressService) { }

  private getAllItemsAddress(): void{
    this.addressServiceInstance
      .GetAddress()
      .subscribe(
        data => this.addressApiJson = data,
        error => console.log(error),
        () => console.log('get All Address Items complete', this.addressApiJson)
      );
  }

  private getItemAddressById(id: string): void{
    this.addressServiceInstance
      .GetUserAddressById(id)/*583a9d3b95ecb33490f49896*/
      .subscribe(
        data => this.addressGetByID = data,
        error => console.log(error),
        () => console.log('get One Address by ID complete', this.addressGetByID)
      );
  }

  private getItemAddressByIdAddress(idAddress: string): void {
    this.addressServiceInstance
      .GetAddressByIdAddress(idAddress)/*5729cc0b8613b6dc11b1fdd0*/
      .subscribe(
        data => this.addressGetByIdAddress = data,
        error => console.log(error),
        () => console.log('get One Address by Address ID complete', this.addressApiJson)
      );
  }

  private addAddress(idUser:string): void {
    console.log(JSON.stringify(this.Address1));
    this.addressServiceInstance
      .AddAddress(idUser,this.Address1)
      .subscribe(
        data => this.response = data,
        error => console.log(error,this.response),
        () => console.log('Add Address complete', this.response)
      );
  }

  private ChangeAddressById(idUser: string, idAddress: string): void {
    // this.Address1.postCode = item.posteCode;
    // this.Address1.city = item.city;
    // this.Address1.country = item.country;
    // this.Address1.line = item.line;

    this.addressServiceInstance
      .UpdateAddressById(idUser, idAddress,this.Address1)
      .subscribe(
        data => this.response = data,
        error => console.log(error),
        () => console.log('change Address User by ID complete', this.response)
      );
  }

  private DisableAddressByIdAddress(idAddress:string): void {
    this.addressServiceInstance
      .DisableAddressByAddressId(idAddress,this.Address1)
      .subscribe(
        data => this.response = data,
        error => console.log(error),
        () => console.log('change Address user by Address ID complete', this.response)
      );
  }

  ngOnInit() {
    //this.getAllItemsAddress();
    //this.getItemAddressById();
    //this.getItemAddressByIdAddress();
    //this.addAddress();
    //this.ChangeAddressById();
    //this.DisableAddressByIdAddress();
  }
}
