import { Component, OnInit } from '@angular/core';

import { Configuration } from '../../../../shared/app.constants';
import { AddressService } from "../../../../shared/services/address.service";
import {Address, DisableAddress} from '../../../../shared/models/address';
import {User} from '../../../../shared/models/user';
import { UserService } from '../../../../shared/services/user.service';

import { CoolLocalStorage } from 'angular2-cool-storage';

@Component({
  selector: 'app-user-banner',
  templateUrl: './user-banner.component.html',
  styleUrls: ['./user-banner.component.css'],
  providers:[AddressService,UserService,Configuration]

})
export class UserBannerComponent implements OnInit {
  localStorage: CoolLocalStorage;
  private addressApiJson: Object;
  private userGetById: Object;
  private addressUpdate:Address;
  private reponse:Object;
  private disableAddress:DisableAddress;
  private user:User;

  constructor(private addressServiceInstance: AddressService,
              private userServiceInstance: UserService,
              localStorage: CoolLocalStorage
              ){
              this.localStorage = localStorage;
              }

  public modifProfil() :void{
    (<HTMLElement>document.getElementById("myModal")).style.display = "block";
  }
  public closeModal() :void{
    (<HTMLElement>document.getElementById("myModal")).style.display = "none";
  }

  private getItemAddressById(idUser: string): void{
    this.addressServiceInstance
      .GetUserAddressById(idUser)
      .subscribe(
        data => this.addressApiJson = data,
        error => console.log(error),
        () => console.log('get One Address by ID complete', this.addressApiJson)
      );
  }

  private getItemUserById(idUser: string): void {
    this.userServiceInstance
      .GetSingleUserById(idUser)
      .subscribe(
        data => this.userGetById = data,
        error => console.log(error),
        () => console.log('get One Item complete', this.userGetById)//console.log('get All Items complete')
      );
  }

  private deleteAddress(addressid:string,liId:number): void {
  let liDelete = (<HTMLElement>document.getElementById("address"+liId));
  liDelete.style.display = "none";
  this.disableAddress={active:false};
  this.addressServiceInstance
    .DisableAddressByAddressId(addressid,this.disableAddress)
    .subscribe(
      data => this.reponse = data,
      error => console.log(error),
      () => console.log('get One Address by ID complete', this.reponse)
    );
}


  private unlockAddress(inputsiI:number): void {
    let inputLine = (<HTMLInputElement>document.getElementById("inputLine"+inputsiI));
    let inputCity = (<HTMLInputElement>document.getElementById("inputCity"+inputsiI));
    let inputCountry = (<HTMLInputElement>document.getElementById("inputCountry"+inputsiI));
    let inputPostCode = (<HTMLInputElement>document.getElementById("inputPostCode"+inputsiI));
    let pencil = (<HTMLInputElement>document.getElementById("pencil"+inputsiI));
    let check = (<HTMLInputElement>document.getElementById("check"+inputsiI));


    inputLine.removeAttribute("disabled");
    inputCity.removeAttribute("disabled");
    inputCountry.removeAttribute("disabled");
    inputPostCode.removeAttribute("disabled");

    pencil.style.display = "none";
    check.style.display = "inline";
  }


  private updateAddress(inputsID:number,addressId:string): void {
    let inputLine = (<HTMLInputElement>document.getElementById("inputLine"+inputsID));
    let inputCity = (<HTMLInputElement>document.getElementById("inputCity"+inputsID));
    let inputCountry = (<HTMLInputElement>document.getElementById("inputCountry"+inputsID));
    let inputPostCode = (<HTMLInputElement>document.getElementById("inputPostCode"+inputsID));
    let pencil = (<HTMLInputElement>document.getElementById("pencil"+inputsID));
    let check = (<HTMLInputElement>document.getElementById("check"+inputsID));


    inputLine.setAttribute("disabled","true");
    inputCity.setAttribute("disabled","true");
    inputCountry.setAttribute("disabled","true");
    inputPostCode.setAttribute("disabled","true");

    pencil.style.display = "inline";
    check.style.display = "none";

    console.log(inputPostCode.value);
    console.log(Number(inputPostCode.value));
    console.log(parseInt(inputPostCode.value));

    this.addressUpdate = {
      postCode: Number(inputPostCode.value),
      city: inputCity.value,
      country: inputCountry.value,
      line: inputLine.value,
    };

    this.addressServiceInstance
      .UpdateAddressById(this.localStorage.getItem('userId'),addressId,this.addressUpdate)
      .subscribe(
        data => this.reponse = data,
        error => console.log(error),
        () => console.log('get One Address by ID complete', this.reponse)
      );


  }

  private updateProfile(id:string):void{
    // this.user = {
    //
    // };
    this.userServiceInstance
      .ChangeUserInformation(id,this.user)
      .subscribe(
        data => this.userGetById = data,
        error => console.log(error),
        () => console.log('get One Item complete', this.userGetById)//console.log('get All Items complete')
      );
  }


  ngOnInit() {
    const id = this.localStorage.getItem('userId');
    this.getItemAddressById(id);
    this.getItemUserById(id);
  }

}
