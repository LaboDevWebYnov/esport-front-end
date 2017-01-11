import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-banner',
  templateUrl: './user-banner.component.html',
  styleUrls: ['./user-banner.component.css'],

})
export class UserBannerComponent implements OnInit {

  constructor() { }

  modifProfil(){
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
  }
  closeModal(){
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
  }

  ngOnInit() {
  }

}
