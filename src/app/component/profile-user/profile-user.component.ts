import { Component, OnInit } from '@angular/core';
import { Configuration } from '../../../shared/app.constants';
import { UserService } from '../../../shared/services/user.service';
import { CoolLocalStorage } from 'angular2-cool-storage';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['profile-user.component.css'],
  providers:[UserService,Configuration]
})
export class ProfileUserComponent implements OnInit {

  localStorage: CoolLocalStorage;
  private userGetById: Object;
  master = 'Master';

  constructor(private userServiceInstance: UserService,
              localStorage: CoolLocalStorage) {this.localStorage = localStorage;}

  ngOnInit() {
    this.localStorage.removeItem('gameId');
    let id = this.localStorage.getItem('userId');
    this.getItemUserById(id);
  }

  private getItemUserById(idUser: string): void {
    this.userServiceInstance
      .GetSingleUserById(idUser)
      .subscribe(
        data => this.userGetById = data,
        error => console.log(error),
        () => console.log('get user complete', this.userGetById)
      );
  }

  public changeOnglet(event, option): void {
    let i, tabContent, tabLinks;

    tabContent = document.getElementsByClassName("content");
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

}
