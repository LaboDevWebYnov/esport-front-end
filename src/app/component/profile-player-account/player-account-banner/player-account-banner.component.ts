import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-player-account-banner',
  templateUrl: './player-account-banner.component.html',
  styleUrls: ['./player-account-banner.component.css']
})
export class PlayerAccountBannerComponent implements OnInit {
  gameId: string;
  bannerName: string;

  constructor(private route: ActivatedRoute,) { }

  ngOnInit() {
    this.gameId = this.route.snapshot.params['gameId'];
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
    }
    console.log(this.gameId);
    console.log(this.bannerName);
  }

}
