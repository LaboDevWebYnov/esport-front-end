import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { RegistrationService } from '../../../../../shared/services/registration.service';
import { SignupUser } from '../../../../../shared/models/utils/signup-user';
import { Configuration } from '../../../../../shared/app.constants';


@Component({
  selector: 'app-step0',
  templateUrl: './step0.component.html',
  styleUrls: ['./step0.component.css'],
  providers:[RegistrationService,Configuration]
})
export class Step0Component implements OnInit {

  private response: Object;
  private errorMessage: string;
  private infoMessage: string;
  private signupUser: SignupUser;
  submitted = false;

  constructor(private registrationServiceInstance: RegistrationService) {
  }

  ngOnInit() {
  }

  onSubmit(event) {
    this.submitted = true;
    this.signupUser = new SignupUser();
    this.signupUser.email = event.target[0].value;
    this.SignupUser();
  }

  //consome l'api pour singup le user
  private SignupUser(): void {
    this.registrationServiceInstance
      .registerUser(this.signupUser)
      .subscribe(
        data => this.response = data,
        error => {
                    //console.log(JSON.parse(error._body).error),
                      this.errorMessage = JSON.parse(error._body).error;
                      this.infoMessage = null;
        },
        () => {
                    //console.log('signup User complete', this.response),
                      this.infoMessage = "Check Now your Email to signup ...";
                      this.errorMessage = null
        }
      );
  }
}
