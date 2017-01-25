import { Component, OnInit } from '@angular/core';

import { Configuration } from '../../../../shared/app.constants';
import { AddressService } from "../../../../shared/services/address.service";
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-user-banner',
  templateUrl: './user-banner.component.html',
  styleUrls: ['./user-banner.component.css'],
  providers:[AddressService,UserService,Configuration]

})
export class UserBannerComponent implements OnInit {

  private addressApiJson: Object;
  private userGetById: Object;

  constructor(private addressServiceInstance: AddressService,
              private userServiceInstance: UserService) { }

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

  private deleteAddress(){}

  ngOnInit() {
    var id = "569000574367285c00961282";/*583a9d3b95ecb33490f49896*//*569000574367285c00961282*/
    this.getItemAddressById(id);
    this.getItemUserById(id);
  }

}
