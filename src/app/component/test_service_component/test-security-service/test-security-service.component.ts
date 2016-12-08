import {Component, OnInit} from '@angular/core';
import {SecurityService} from '../../../../shared/services/security.service';
import {Configuration} from '../../../../shared/app.constants';

@Component({
  selector: 'app-test-security-service',
  templateUrl: './test-security-service.component.html',
  styleUrls: ['./test-security-service.component.css'],
  providers: [SecurityService, Configuration]
})
export class TestSecurityServiceComponent implements OnInit {

  verifyEmailJson: Object;

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

  ngOnInit() {
    this.verifyEmail("leamonsqueezy@ynov.com");
  }

}
