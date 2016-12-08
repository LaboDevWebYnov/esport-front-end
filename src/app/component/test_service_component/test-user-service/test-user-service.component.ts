import {Component, OnInit} from '@angular/core';

import {UserService} from '../../../../shared/services/user.service';
import {Http, HttpModule} from "@angular/Http";
import {Configuration} from '../../../../shared/app.constants';
import {ChangePasswordObject} from '../../../../shared/models/utils/change-password-object';
import {ChangeEmailObject} from '../../../../shared/models/utils/change-email-object';
import {User} from '../../../../shared/models/user';
import {Address} from '../../../../shared/models/address';

@Component({
  selector: 'app-test-user-service',
  templateUrl: './test-user-service.component.html',
  styleUrls: ['./test-user-service.component.css'],
  providers: [UserService, Configuration]
})
export class TestUserServiceComponent implements OnInit {

  usersApiJson: Object;
  userGetById: Object;
  userGetByUsername: Object;
  response: Object;

  ChangeUserPassword: ChangePasswordObject = {
    oldPassword: "string",
    newPassword: "string",
    newPasswordConfirmation: "string"
  };

  ChangeUserEmail: ChangeEmailObject = {
    email: "aaaaaaaa@e.com"
  };

  address1: Address = {
    postCode: 0,
    city: "string",
    country: "string",
    line: "string"
  };

  friends: User[];

  UpdateUser: User = {
    firstname: "ya",
    lastname: "yo",
    username: "changeUserInfo",
    birthDate: new Date(1998, 11, 27),
    email: "aaaa125@e.com",
    password: "mdp",
    avatar: "string",
    address: this.address1,
    phoneNumber: "string",
    admin: true,
    friends: this.friends,
    interests: null,
    active: true,
    created_at: new Date(),
    updated_at: new Date()
  };

  AddNewUser: User = {
    firstname: "ya",
    lastname: "yo",
    username: "yu",
    birthDate: new Date(1998, 11, 27),
    email: "test123456789@esport.com",
    password: "mdp",
    avatar: "string",
    address: this.address1,
    phoneNumber: "string",
    admin: true,
    friends: this.friends,
    interests: null,
    active: true,
    created_at: new Date(),
    updated_at: new Date()
  };

  constructor(private userServiceInstance: UserService) {
  }

  private getAllItemsUser(): void {
    this.userServiceInstance
      .GetAllUsers()
      .subscribe(
        data => this.usersApiJson = data,
        error => console.log(error),
        () => console.log('get All Items complete', this.usersApiJson)
      );
  }


  private getItemUserById(): void {
    this.userServiceInstance
      .GetSingleUserById("583a9d3b95ecb33490f49896")
      .subscribe(
        data => this.userGetById = data,
        error => console.log(error),
        () => console.log('get One Item complete', this.userGetById)//console.log('get All Items complete')
      );
  }


  private getItemUserByUsername(): void {
    this.userServiceInstance
      .GetSingleUserByUsername("string")
      .subscribe(
        data => this.userGetByUsername = data,
        error => console.log(error),
        () => console.log('get One Item By Username', this.userGetByUsername)//console.log('get All Items complete')
      );
  }

  private ChangeUserInfo(): void {
    console.log(JSON.stringify(this.UpdateUser));
    this.userServiceInstance
      .ChangeUserInformation("583a9d3b95ecb33490f49896", this.UpdateUser)
      .subscribe(
        data => this.response = data,
        error => console.log(error),
        () => console.log('change user complete', this.response)
      );
  }

  private ChangePassword(): void {
    this.userServiceInstance
      .ChangeUserPassword("583a9d3b95ecb33490f49896", this.ChangeUserPassword)
      .subscribe(
        data => this.response = data,
        error => console.log(error),
        () => console.log('change user password complete', this.response)
      );
  }

  private ChangeEmail(): void {
    this.userServiceInstance
      .ChangeUserEmail("583a9d3b95ecb33490f49896", this.ChangeUserEmail)
      .subscribe(
        data => this.response = data,
        error => console.log(error),
        () => console.log('change user email complete', this.response)
      );
  }

  private addUser(): void {
    console.log(JSON.stringify(this.AddNewUser));
    this.userServiceInstance
      .AddUser(this.AddNewUser)
      .subscribe(
        data => this.response = data,
        error => console.log(error, this.response),
        () => console.log('Add User complete', this.response)
      );
  }

  private deleteUser(): void {
    this.userServiceInstance
      .Delete("583a9d3b95ecb33490f49896")
      .subscribe(
        data => this.response = data,
        error => console.log(error),
        () => console.log('Delete User complete', this.response)
      );
  }

  ngOnInit() {
    this.getAllItemsUser();
    //this.getItemUserById();
    //this.getItemUserByUsername();
    //this.ChangePassword();
    //this.ChangeEmail();
    //this.deleteUser();
    //this.addUser();
    //this.ChangeUserInfo();
  }

}
