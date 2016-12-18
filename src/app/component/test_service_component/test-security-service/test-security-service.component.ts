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

  public authLiClick(evnt,option): void
  {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("formStyle");
    for (i = 0; i < tabcontent.length; i++) {
      (<HTMLInputElement>tabcontent[i]).style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      (<HTMLInputElement>tablinks[i]).className = tablinks[i].className.replace(" active", "");
    }

    (<HTMLInputElement>document.getElementById(option)).style.display = "block";
    evnt.currentTarget.className += " active";
  }

}
