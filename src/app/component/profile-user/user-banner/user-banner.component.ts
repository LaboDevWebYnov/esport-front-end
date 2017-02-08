import { Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';

import { Configuration } from '../../../../shared/app.constants';
import { AddressService } from "../../../../shared/services/address.service";
import { UserService } from '../../../../shared/services/user.service';
import {User} from "../../../../shared/models/user";


@Component({
  selector: 'app-user-banner',
  templateUrl: './user-banner.component.html',
  styleUrls: ['./user-banner.component.css'],
  providers:[AddressService,UserService,Configuration]

})
export class UserBannerComponent implements OnInit {

  private addressApiJson: Object;
  private userGetById: Object;
  private userToUpdate: User;
  localStorage: CoolLocalStorage;

  constructor(private addressServiceInstance: AddressService,
              private userServiceInstance: UserService,
              localStorage: CoolLocalStorage) {
    this.localStorage = localStorage;
  }

  modifProfil(){
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }
  closeModal(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
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

  onSubmit(event) {
      console.log(event.target[0].value, //username
        event.target[1].value, //pwd
        event.target[2].value, //confirm pwd
        event.target[3].value, //email
        event.target[4].value, //firstname
        event.target[5].value, //lastname
        event.target[6].value, //phonenumber
        event.target[7].value, //day
        event.target[8].value, //month
        event.target[9].value, //year
        );
    this.userToUpdate = new User();
    this.userToUpdate = <User>this.userGetById;
    this.userToUpdate.firstname = event.target[4].value;
    this.userToUpdate.lastname = event.target[5].value;
    this.userToUpdate.email = event.target[3].value
    this.userToUpdate.username = event.target[0].value;
    this.userToUpdate.phoneNumber = event.target[6].value;
    this.userToUpdate.birthDate = new Date(parseInt(event.target[9].value),parseInt(event.target[8].value),parseInt(event.target[7].value));
  }

  private deleteAddress(){}

  ngOnInit() {
    var id = this.localStorage.getItem('userId');
    this.getItemAddressById(id);
    this.getItemUserById(id);
  }

}
