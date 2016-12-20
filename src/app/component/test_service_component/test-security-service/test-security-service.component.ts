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

    var test1 = this.verifyEmail(email);
    var test2 = this.verifyAuth(this.authJson);

    console.log(test1 + " | " + test2);

    setTimeout(function () {
      console.log(test1 + " | " + test2)
    },5000)
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

      var entryContentContainsUpperCase = this.CheckIfThereIsAUppercaseCharacterInAString(entryContent);
      var entryContentContainsLowerCase = this.CheckIfThereIsALowercaseCharacterInAString(entryContent);
      var entryContentContainsNumeric = this.CheckIfThereIsANumberCharacterInAString(entryContent);

      if ((entryContentContainsUpperCase === true) && (entryContentContainsLowerCase === true) && (entryContentContainsNumeric === true)) {
        event.srcElement.style.borderColor = "green";
        isAnPassword = true;
      }
      else {
        event.srcElement.style.borderColor = "red";
      }
    }
    if((typeOfVerification==="email") || (typeOfVerification==="login")) {
      var entryContentContainsAt = false,entryContentContainsPointAfterAt=false;
      var entryContentContainsLowerCase = this.CheckIfThereIsALowercaseCharacterInAString(entryContent);

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
      var entryContentContainsUpperCase = this.CheckIfThereIsAUppercaseCharacterInAString(entryContent);
      var entryContentContainsLowerCase = this.CheckIfThereIsALowercaseCharacterInAString(entryContent);
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

  public CheckIfThereIsAUppercaseCharacterInAString(string): boolean
  {
    if (/[A-Z]/.test(string)) {
      return true;
    }
    else
    {
      return false;
    }
  }
  public CheckIfThereIsALowercaseCharacterInAString(string): boolean
  {
    if (/[a-z]/.test(string)) {
      return true;
    }
    else
    {
      return false;
    }
  }
  public CheckIfThereIsANumberCharacterInAString(string): boolean
  {
    if (/[1-9]/.test(string)) {
        return true;
    }
    else
    {
      return false;
    }
  }

}
