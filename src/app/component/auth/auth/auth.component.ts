import {Component, OnInit} from '@angular/core';
import {SecurityService} from '../../../../shared/services/security.service';
import {Configuration} from '../../../../shared/app.constants';
import {AuthObject} from '../../../../shared/models/utils/auth-object';
import {Router} from '@angular/router';
import { RegistrationService } from '../../../../shared/services/registration.service';
import { SignupUser } from '../../../../shared/models/utils/signup-user';
import * as _ from 'lodash';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [SecurityService, RegistrationService, Configuration]

})
export class AuthComponent implements OnInit {
  verifyAuthJson: any;//retour serv

  status: number = null;
  error: any;

  authJson: AuthObject = {
    login: "",
    password: ""
  };

  private response: Object;
  private errorMessage: string;
  private infoMessage: string;
  private signupUser: SignupUser;
  submitted = false;


  constructor(private securityServiceInstance: SecurityService,
              private router: Router,
              private registrationServiceInstance: RegistrationService) {
  }

  ngOnInit() {
  }

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

  public checkAuth(): void {

    const email = (<HTMLInputElement>document.getElementById("emailAuth")).value;
    const pwd = (<HTMLInputElement>document.getElementById("pwdAuth")).value;

    this.authJson = {
      login: email,
      password: pwd
    };

    this.verifyAuth(this.authJson, (status: number, error: any, verifyAuthJson: any) => {
      //si le status de retour est à 200: OK, et que l'objet de retour n'est pas vide: on redirige
      if (status == 200 && !_.isEmpty(verifyAuthJson)) {
        this.router.navigate(['./home']);
      }
      //sinon 401, bad credentials, message d'erreur sur la page, l'user doit recommencer
      else if (status == 401 && error) {
        // && _.includes(verifyAuthJson, 'error')
        console.log('Auth error: ' + JSON.stringify(error));
        this.status = status;
        this.error = error;
        (<HTMLInputElement>document.getElementById("emailAuth")).value = "";
        (<HTMLInputElement>document.getElementById("pwdAuth")).value = "";
        (<HTMLInputElement>document.getElementById("emailAuth")).style.borderColor = "#8C8C8C";
        (<HTMLInputElement>document.getElementById("pwdAuth")).style.borderColor = "#8C8C8C";
      }
    });
  }


  public authLiClick(event, option): void {
    let i, tabContent, tabLinks;

    tabContent = document.getElementsByClassName("formStyle");
    for (i = 0; i < tabContent.length; i++) {
      (<HTMLInputElement>tabContent[i]).style.display = "none";
    }

    tabLinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tabLinks.length; i++) {
      (<HTMLInputElement>tabLinks[i]).className = tabLinks[i].className.replace(" active", "");
    }

    (<HTMLInputElement>document.getElementById(option)).style.display = "block";
    event.currentTarget.className += " active";
  }


  public entryVerification(event, typeOfVerification): void {
    const entryContent = event.srcElement.value;
    let isAnEmail = false, isAnUsername = false;
    const logInSubmitButton = (<HTMLInputElement>document.getElementById("logInSubmitButton"));

    if (typeOfVerification === "password") {

      const entryContentContainsUpperCase = AuthComponent.checkIfThereIsAUppercaseCharacterInAString(entryContent);
      const entryContentContainsLowerCase = AuthComponent.checkIfThereIsALowercaseCharacterInAString(entryContent);
      const entryContentContainsNumeric = AuthComponent.checkIfThereIsANumberCharacterInAString(entryContent);

      if ((entryContentContainsUpperCase === true) || (entryContentContainsLowerCase === true) || (entryContentContainsNumeric === true)) {
        event.srcElement.style.borderColor = "green";
      }
      else {
        event.srcElement.style.borderColor = "red";
        logInSubmitButton.setAttribute("disabled","true");
      }
    }

    if ((typeOfVerification === "email") || (typeOfVerification === "login")) {
      let entryContentContainsAt = false, entryContentContainsPointAfterAt = false;
      const entryContentContainsLowerCase = AuthComponent.checkIfThereIsALowercaseCharacterInAString(entryContent);

      if (entryContent.indexOf('@') != -1) {
        entryContentContainsAt = true;
      }
      if (entryContent.indexOf('@') < entryContent.lastIndexOf('.')) {
        entryContentContainsPointAfterAt = true;
      }
      if ((entryContentContainsLowerCase === true) && (entryContentContainsAt === true) && (entryContentContainsPointAfterAt === true) && (entryContent.lastIndexOf('.') != entryContent.length - 1)) {
        event.srcElement.style.borderColor = "green";
        isAnEmail = true;
      }
      else {
        event.srcElement.style.borderColor = "red";
        logInSubmitButton.setAttribute("disabled", "true");
      }
    }
    if ((typeOfVerification === "username") || (typeOfVerification === "login")) {
      if (AuthComponent.checkIfThereIsAUppercaseCharacterInAString(entryContent) && AuthComponent.checkIfThereIsALowercaseCharacterInAString(entryContent)) {
        event.srcElement.style.borderColor = "green";
        isAnUsername = true;
      }
      else {
        event.srcElement.style.borderColor = "red";
        logInSubmitButton.setAttribute("disabled", "true");
      }
    }
    if (typeOfVerification === "login") {
      if ((isAnEmail === true) || (isAnUsername === true)) {
        event.srcElement.style.borderColor = "green";

      }
      else {
        event.srcElement.style.borderColor = "red";
        logInSubmitButton.setAttribute("disabled", "true");
      }
    }

    const checkInput1 = (<HTMLInputElement>document.getElementById("emailAuth"));
    const checkInput2 = (<HTMLInputElement>document.getElementById("pwdAuth"));
    if((checkInput1.style.borderColor == "green") && (checkInput2.style.borderColor == "green"))
    {
      logInSubmitButton.removeAttribute('disabled');
    }
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


  private static checkIfThereIsAUppercaseCharacterInAString(string): boolean {
    return /[A-Z]/.test(string);
  }

  private static checkIfThereIsALowercaseCharacterInAString(string): boolean {
    return /[a-z]/.test(string);
  }

  private static checkIfThereIsANumberCharacterInAString(string): boolean {
    return /[1-9]/.test(string);
  }

  private static checkIfTheStringIsAnEmail(string): boolean {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/ig.test(string);
  }

}
