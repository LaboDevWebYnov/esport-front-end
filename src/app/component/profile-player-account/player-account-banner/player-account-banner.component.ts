import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CoolLocalStorage} from "angular2-cool-storage";

@Component({
  selector: 'app-player-account-banner',
  templateUrl: './player-account-banner.component.html',
  styleUrls: ['./player-account-banner.component.css']
})
export class PlayerAccountBannerComponent implements OnInit {
  localStorage: CoolLocalStorage;
  gameId: string;
  bannerName: string;

  constructor(private route: ActivatedRoute,localStorage: CoolLocalStorage) {
    this.localStorage = localStorage;
  }

  ngOnInit() {
    this.gameId = this.localStorage.getItem('gameId');
    switch (this.gameId)
    {
      case '569104a0417130681bcf1586' :
                this.bannerName = "banner-csgo-01";
                break;
      case '586f56587c2b7302f311eaa5' :
                this.bannerName = "banner-dota-01";
                break;
      case '586f56f5b9fde402faa33fdc' :
                this.bannerName = "banner-LOL-01";
                break;
      case '583d85afe26ea010b06b801b' :
                this.bannerName = "banner-overwatch-01";
                break;
      case '586f56bfb9fde402faa33fdb' :
                this.bannerName = "banner-rocketleague-01";
                break;
      case '5a61e8d69fe0d61c36c54253' :
                this.bannerName = "banner-r6-01";
                break;
    }
    console.log(this.gameId);
    console.log(this.bannerName);
  }

}
