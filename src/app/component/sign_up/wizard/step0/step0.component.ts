import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { UserService } from '../../../../../shared/services/user.service';
import { SignupUser } from '../../../../../shared/models/utils/signup-user';
import { Configuration } from '../../../../../shared/app.constants';


@Component({
  selector: 'app-step0',
  templateUrl: './step0.component.html',
  styleUrls: ['./step0.component.css'],
  providers:[UserService,Configuration]
})
export class Step0Component implements OnInit {

  public response: Object;
  public errorMessage: string;
  public infoMessage: string;
  public signupUser: SignupUser;

  constructor(private userServiceInstance: UserService,
              private router: Router) {
  }

  ngOnInit() {
  }

  submitted = false;

  onSubmit(event) {
    //console.log(event);
    //console.log(event.target[0].value);
    this.submitted = true;
    this.signupUser = new SignupUser();
    this.signupUser.email = event.target[0].value;
    this.SignupUser();
  }

  //consome l'api pour singup le user
  private SignupUser(): void {
    console.log(JSON.stringify(this.signupUser));
    this.userServiceInstance
      .SignupUser(this.signupUser)
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
