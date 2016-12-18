import {Component, OnInit} from '@angular/core';
import {SecurityService} from '../../../../shared/services/security.service';
import {Configuration} from '../../../../shared/app.constants';
import {AuthObject} from '../../../../shared/models/utils/auth-object';

@Component({
  selector: 'app-test-security-service',
  templateUrl: './test-security-service.component.html',
  styleUrls: ['./test-security-service.component.css'],
  providers: [SecurityService, Configuration]
})
export class TestSecurityServiceComponent implements OnInit {

  verifyEmailJson: Object;//retour serv
  verifyAuthJson:Object;//retour serv

  authJson:AuthObject={
    login: "",
    password: ""
  };


  constructor(private securityServiceInstance: SecurityService) {
  }

  private verifyEmail(email: string): void {
    this.securityServiceInstance
      .verifyEmail(email)
      .subscribe(
        data => this.verifyEmailJson = data,
        error => console.log(error),
        () => console.log('get One Item complete', this.verifyEmailJson)//console.log('get All Items complete')
      );
  }

  private verifyAuth(sendAuthJson: AuthObject): void {
    this.securityServiceInstance
      .auth(sendAuthJson)
      .subscribe(
        data => this.verifyAuthJson = data,
        error => console.log(error),
        () => console.log('get One Item complete', this.verifyAuthJson)//console.log('get All Items complete')
      );
  }

  ngOnInit() {}

  public checkAuth(): void {

    var email = (<HTMLInputElement>document.getElementById("emailAuth")).value;
    var pwd = (<HTMLInputElement>document.getElementById("pwdAuth")).value;

    this.authJson={
      login: email,
      password: pwd
    };

    this.verifyEmail(email);
    // this.verifyAuth(this.authJson);
  }

  public authLiClick(event,option): void
  {
    var i, tabContent, tabLinks;

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

  public entryVerification(event,typeOfVerification): void
  {

    var entryContent = event.srcElement.value;
    var isAnEmail = false,isAnUsername = false,isAnPassword=false;

    if(typeOfVerification==="password") {

        var entryContentContainsUpperCase = false, entryContentContainsLowerCase = false, entryContentContainsNumeric = false;

        if (/[A-Z]/.test(entryContent)) {
          entryContentContainsUpperCase = true;
        }

        if (/[a-z]/.test(entryContent)) {
          entryContentContainsLowerCase = true;
        }

        if (/[1-9]/.test(entryContent)) {
          entryContentContainsNumeric = true;
        }

        console.log(entryContentContainsUpperCase + " | " + entryContentContainsLowerCase + " | " + entryContentContainsNumeric);

        if ((entryContentContainsUpperCase === true) && (entryContentContainsLowerCase === true) && (entryContentContainsNumeric === true)) {
          event.srcElement.style.borderColor = "green";
          isAnPassword = true;
        }
        else {
          event.srcElement.style.borderColor = "red";
        }
    }
    if((typeOfVerification==="email") || (typeOfVerification==="login")) {
      var entryContentContainsAt = false, entryContentContainsLowerCase = false,entryContentContainsPointAfterAt=false;

      if (/[a-z]/.test(entryContent)) {
        entryContentContainsLowerCase = true;
      }

      if( entryContent.indexOf('@') != -1 ){
        entryContentContainsAt = true;
      }

      if( entryContent.indexOf('@') < entryContent.lastIndexOf('.') ){
        entryContentContainsPointAfterAt = true;
      }

      if ((entryContentContainsLowerCase === true) && (entryContentContainsAt === true) && (entryContentContainsPointAfterAt === true) && (entryContent.lastIndexOf('.') !=  entryContent.length-1)) {
        event.srcElement.style.borderColor = "green";
        isAnEmail = true;
      }
      else {
        event.srcElement.style.borderColor = "red";
      }

    }
    if((typeOfVerification==="username") || (typeOfVerification==="login")) {

      var entryContentContainsUpperCase = false, entryContentContainsLowerCase = false;

      if (/[A-Z]/.test(entryContent)) {
        entryContentContainsUpperCase = true;
      }

      if (/[a-z]/.test(entryContent)) {
        entryContentContainsLowerCase = true;
      }

      if ((entryContentContainsUpperCase === true) && (entryContentContainsLowerCase === true))
      {
        event.srcElement.style.borderColor = "green";
        isAnUsername = true;
      }
      else {
        event.srcElement.style.borderColor = "red";
      }
    }

    if(typeOfVerification==="login")
    {
      if( (isAnEmail===true) || (isAnUsername===true))
      {
        event.srcElement.style.borderColor = "green";
      }
      else {
        event.srcElement.style.borderColor = "red";
      }
    }


  }

}
