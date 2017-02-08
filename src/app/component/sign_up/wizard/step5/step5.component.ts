import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {IsVerifiedRequestObject} from '../../../../../shared/models/utils/is-verified-request-object';
import {CancelRegistrationRequestObject} from '../../../../../shared/models/utils/cancel-registration-request-object'
import {CompleteRegistrationRequestObject} from '../../../../../shared/models/utils/complete-registration-request-object'
import {RegistrationService} from '../../../../../shared/services/registration.service';
import {User} from "../../../../../shared/models/user";
import {UserService} from '../../../../../shared/services/user.service';
import {GameService} from '../../../../../shared/services/game.service';
import {Configuration} from '../../../../../shared/app.constants';
import { CoolLocalStorage } from 'angular2-cool-storage';
import {AuthObject} from '../../../../../shared/models/utils/auth-object';
import {SecurityService} from '../../../../../shared/services/security.service';
import * as _ from 'lodash';





@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.css'],
  providers: [UserService, GameService, RegistrationService, SecurityService, Configuration]

})
export class Step5Component implements OnInit {
  localStorage: CoolLocalStorage;
  private idParam:string;
  private token: string;
  private userGetById: Object;
  private games: Object;
  private selectedGame: string;
  private response: Object;
  private verifiedCodeTemp: string;
  private user: User;
  private verifyAuthJson: any;//retour serv
  private authJson: AuthObject
  //form&http_query status
  status = null;
  submitted = false;
  public errorMessage: string;
  public infoMessage: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userServiceInstance: UserService,
              private gameServiceInstance: GameService,
              private securityServiceInstance: SecurityService,
              private registrationServiceInstance: RegistrationService,
              localStorage: CoolLocalStorage) {
    this.localStorage = localStorage;
  }

  ngOnInit() {
    //get the url path&query params
    this.idParam = this.route.snapshot.params['id'];
    this.status = this.route.snapshot.params['status'];
    this.token = this.route.snapshot.params['token'];
    this.selectedGame = this.route.snapshot.params['selectedGame'];
    //console.log(this.idParam, this.token, this.status, this.selectedGame);

    this.getUserById(this.idParam, (userGet: User) => {
      this.user = userGet;
      //check if the user is already verified
      this.isVerifiedUser(userGet.email, this.token, (verifiedCode: string, userId: string) => {
        this.verifiedCodeTemp = verifiedCode;
        if (verifiedCode === 'E_NOT_VERIFIED') {
          this.router.navigate(['/']);
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
            else {
              this.status = 200;
              this.errorMessage = null;
              this.infoMessage = "Votre inscription a bien été pris en compte !";
            }
          }
        }
      });
    });
  }

  //Triggered when the form is submited
  onSubmit(event) {
    //set when the form is submited
    this.submitted = true;
    this.completeRegistration(this.idParam, this.token, (successCode: string, errorMessage: string) => {
      console.log(successCode);
      //console.log(errorMessage);
      if(successCode == 'USER_REG_COMPLETED')
      {
        console.log(this.user);
        this.checkAuth(this.user.email,this.user.password, (status: number, errorMessage:string, infoMessage: string) => {
          if(status == 200)
          {
            this.router.navigate(['signup/step6/'+this.token, { id: this.idParam , status: status } ]);
          }
          else
          {
            this.status = status;
            this.errorMessage = errorMessage;
            this.infoMessage = infoMessage;
          }
        });

      }
      else
      {
        this.status = 401;
        this.errorMessage = errorMessage;
        this.infoMessage = null;


      }
    });

  };

  cancelSignup()
  {
    //console.log('Cancel signup');
    this.cancelRegistration(this.idParam, this.token, (successCode: string, errorMessage: string) => {
      this.router.navigate(['/']);
    });
  };

  private getUserById(id: string, callback): any {
    this.userServiceInstance
      .GetSingleUserById(id)
      .subscribe(
        data => this.userGetById = data,
        error => console.log(error),
        () => {/*console.log('get User complete', this.userGetById)*/callback(<User>this.userGetById)}
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

  //check if the user is already verified and the token is available
  private cancelRegistration = (id: string, token: string, callback): any => {
    this.registrationServiceInstance
      .cancelRegistration(id, token)
      .subscribe(
        data => {
          this.response = data;
        },
        error => {
          console.log(JSON.parse(error._body).error.errorMessage);
          callback(null, JSON.parse(error._body).error.errorMessage);
        },
        () => {
          //console.log(this.response);
          callback((<CancelRegistrationRequestObject>this.response).successCode, null);
        }
      );
  };

  //check if the user is already verified and the token is available
  private completeRegistration = (id: string, token: string, callback): any => {
    this.registrationServiceInstance
      .completeRegistration(id, token)
      .subscribe(
        data => {
          this.response = data;
        },
        error => {
          //console.log(JSON.parse(error._body).error.errorMessage);
          callback(null, JSON.parse(error._body).error.errorMessage);
        },
        () => {
          //console.log(this.response);
          callback(JSON.parse((<any>this.response)._body).successCode, null);
        }
      );
  };

  private verifyAuth(sendAuthJson: AuthObject, callback): any {
    this.securityServiceInstance
      .auth(sendAuthJson)
      .subscribe(
        data => this.verifyAuthJson = data,
        error => {
          console.log(error);
          callback(401, JSON.parse(error._body).error, null)
        },//this.router.redirectTo(['/home'])} ,
        () => {
          callback(200, null, this.verifyAuthJson);
        }
      );
  }

  public checkAuth(userEmail: string, userPwd: string, callback): void {

    const email = userEmail;//(<HTMLInputElement>document.getElementById("emailAuth")).value;
    const pwd = this.localStorage.getItem('pwd');


    this.authJson = {
      login: email,
      password: pwd
    };

    this.verifyAuth(this.authJson, (status: number, error: any, verifyAuthJson: any) => {
      //si le status de retour est à 200: OK, et que l'objet de retour n'est pas vide: on redirige
      if (status == 200 && !_.isEmpty(verifyAuthJson)) {
        console.log(verifyAuthJson)
        this.localStorage.clear();
        this.localStorage.setItem('isConnected', 'true');
        this.localStorage.setItem('userId', verifyAuthJson.userId);
        this.localStorage.setItem('username', verifyAuthJson.username);
        this.localStorage.setItem('firstname', verifyAuthJson.firstname);
        this.localStorage.setItem('lastname', verifyAuthJson.lastname);

        location.reload();
        //this.router.navigate(['/']);
        callback(status, null, null);
      }
      //sinon 401, bad credentials, message d'erreur sur la page, l'user doit recommencer
      else if (status == 401 && error) {
        // && _.includes(verifyAuthJson, 'error')
        console.log('Auth error: ', error.errorMessage);
        callback(status, error.errorMessage, null);
      }
    });
  }

}
