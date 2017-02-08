import { Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';

import { Configuration } from '../../../../shared/app.constants';
import { AddressService } from "../../../../shared/services/address.service";
import {Address, DisableAddress} from '../../../../shared/models/address';
import {User} from '../../../../shared/models/user';
import { UserService } from '../../../../shared/services/user.service';
import { GameService } from '../../../../shared/services/game.service';



@Component({
  selector: 'app-user-banner',
  templateUrl: './user-banner.component.html',
  styleUrls: ['./user-banner.component.css'],
  providers:[AddressService,UserService,GameService,Configuration]

})
export class UserBannerComponent implements OnInit {
  localStorage: CoolLocalStorage;
  private addressApiJson: Object;
  private userGetById: Object;
  private addressUpdate:Address;
  private reponse:Object;
  private disableAddress:DisableAddress;
  private user:User;
  private userToUpdate: User;

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
        () => console.log('get user complete', this.userGetById)
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
    //userGetById
    //userToUpdate

    this.userToUpdate = {
      id: this.localStorage.getItem('userId'),
      firstname: "",
      lastname: "",
      username: "",
      birthDate: this.userGetById.birthDate,
      email: "",
      password: "",
      avatar: "",
      address: Address,
      phoneNumber : "",
      admin : "",
      friends : User[],
      interests: "",
      active: "",
      verified: "",
      created_at: Date,
      updated_at:Date,
    };


    this.userServiceInstance
      .ChangeUserInformation(id,this.user)
      .subscribe(
        data => this.userGetById = data,
        error => console.log(error),
        () => console.log('get One Item complete', this.userGetById)//console.log('get All Items complete')
      );
  }

  ngOnInit() {
    let id = this.localStorage.getItem('userId');
    this.getItemAddressById(id);
    this.getItemUserById(id);
  }

}


  // ngOnInit() {
  //   const id = this.localStorage.getItem('userId');
  // onSubmit(event) {
  //     console.log(event.target[0].value, //username
  //       event.target[1].value, //pwd
  //       event.target[2].value, //confirm pwd
  //       event.target[3].value, //email
  //       event.target[4].value, //firstname
  //       event.target[5].value, //lastname
  //       event.target[6].value, //phonenumber
  //       event.target[7].value, //day
  //       event.target[8].value, //month
  //       event.target[9].value, //year
  //       );
  //   this.userToUpdate = new User();
  //   this.userToUpdate = <User>this.userGetById;
  //   this.userToUpdate.firstname = event.target[4].value;
  //   this.userToUpdate.lastname = event.target[5].value;
  //   this.userToUpdate.email = event.target[3].value
  //   this.userToUpdate.username = event.target[0].value;
  //   this.userToUpdate.phoneNumber = event.target[6].value;
  //   this.userToUpdate.birthDate = new Date(parseInt(event.target[9].value),parseInt(event.target[8].value),parseInt(event.target[7].value));
  // }
