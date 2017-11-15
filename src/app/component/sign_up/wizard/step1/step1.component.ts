import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RegistrationService} from '../../../../../shared/services/registration.service';
import {Configuration} from '../../../../../shared/app.constants';
import {User} from '../../../../../shared/models/user';
import {IsVerifiedRequestObject} from '../../../../../shared/models/utils/is-verified-request-object';
import {RegisterUserObject} from '../../../../../shared/models/utils/register-user-object';
import { CoolLocalStorage } from 'angular2-cool-storage';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css'],
  providers: [RegistrationService, Configuration]
})

export class Step1Component implements OnInit {
  //URL PARAMS
  localStorage: CoolLocalStorage;
  private email: string;
  private token: string;
  //Received the data
  private response: Object;
  private user: User;
  private userRegistered: RegisterUserObject;
  private userId: string;
  //form&http_query status
  status = null;
  submitted = false;
  public errorMessage: string;
  public infoMessage: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private registrationServiceInstance: RegistrationService,
              localStorage: CoolLocalStorage) {
              this.localStorage = localStorage;
              this.localStorage.clear();
            }

  ngOnInit() {
    //get the url path&query params
    this.email = this.route.snapshot.params['email'];
    this.token = this.route.snapshot.queryParams['t'];
    console.log(this.email, this.token);
    //check if the user is already verified
    this.isVerifiedUser(this.email, this.token, (verifiedCode: string, userId: string) => {
      if (verifiedCode === 'E_NOT_VERIFIED') {
        //verify the user
        this.verifyUser(this.email, this.token, (status: number, errorMessage: string, infoMessage: string) => {
          this.status = status;
          this.errorMessage = errorMessage;
          this.infoMessage = infoMessage;
          this.userId = userId;
        });
      }
      else {
        if (verifiedCode === 'E_BAD_TOKEN') {
          this.status = 401;
          this.errorMessage = 'Demande de création de compte invalide ! Merci de bien vouloir vour réinscrire. ';
          this.infoMessage = null;
        }
        else {
          if (verifiedCode === 'E_EXPIRED_TOKEN') {
            this.status = 401;
            this.errorMessage = 'Demande de création de compte expirée ! Merci de bien vouloir vour réinscrire.';
            this.infoMessage = null;
          }
          //verifiedCode === 'VERIFIED'
          else
          {
            this.status = 200;
            this.errorMessage = null;
            this.infoMessage = 'L\'adresse ' + this.email + ' a été vérifiée. Vous pouvez continuer l\'inscription ...';
            this.userId = userId;
          }
        }
      }
    });
  }

  //Triggered when the form is submited
  onSubmit(event) {
    //console.log(event);
    //console.log(event.target[5].value);

    //set when the form is submited
    this.submitted = true;
    this.user = new User();
    this.userRegistered = new RegisterUserObject();

    //check if it's the same password
    if (event.target[4].value === event.target[5].value) {
      //username
      this.userRegistered.username = event.target[2].value;
      //firstname
      this.userRegistered.firstname = event.target[1].value;
      //lastname
      this.userRegistered.lastname = event.target[0].value;
      //birthdate
      this.userRegistered.birthDate = event.target[3].value;
      //password
      this.userRegistered.password = event.target[4].value;
      this.userRegistered.passwordConfirmation = event.target[5].value;
      //register user
      this.registerUser(this.userId, this.userRegistered, (status: number, errorMessage: string, infoMessage: string) => {
        if (status == 200) {
          this.status = status;
          this.errorMessage = errorMessage;
          this.infoMessage = infoMessage;
          this.localStorage.setItem('pwd', event.target[2].value);
          this.router.navigate(['signup/step2/' + this.token, {id: this.userId, status: status}]);
        }
        else {
          this.status = status;
          this.errorMessage = errorMessage;
          this.infoMessage = infoMessage;
          console.log(this.status);
          console.log(this.errorMessage);
          console.log(this.infoMessage);
        }
      });
    }
  };

  //verify user mail
  private verifyUser(email: string, token: string, callback): any {
    this.registrationServiceInstance
      .verifyEmail(email, token)
      .subscribe(
        data => this.response = data,
        error => {
          //console.log(error);
          callback(401, JSON.parse(error._body).error)
        },
        () => {
          //console.log('verify user complete', (<User>this.response));
          callback(200, null, 'L\'adresse ' + this.email + ' a été vérifiée. Vous pouvez continuer l\'inscription ...')
        }
      );
  };

  //check if the user is already verified and the token is available
  private isVerifiedUser = (email: string, token: string, callback): any => {
    this.registrationServiceInstance
      .isVerified(email, token)
      .subscribe(
        data => {
          this.response = data;
        },
        error => {
          console.log(error);
        },
        () => {
          //console.log(this.response);
          callback((<IsVerifiedRequestObject>this.response).verifiedCode,
            (<IsVerifiedRequestObject>this.response).userId);
        }
      );
  };

  //register the user's main info
  private registerUser(id: string, user: RegisterUserObject, callback): any {
    this.registrationServiceInstance
      .registerUserMainInfo(id, user)
      .subscribe(
        data => this.response = data,
        error => {
          //console.log(error);
          callback(401, JSON.parse(error._body).error, null);

        },
        () => {
          //console.log('register user complete', this.response);
          callback(200, null, 'user registered !');
        }
      );
  }
}
