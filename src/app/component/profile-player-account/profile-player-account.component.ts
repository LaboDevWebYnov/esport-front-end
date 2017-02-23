import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profile-player-account',
  templateUrl: './profile-player-account.component.html',
  styleUrls: ['./profile-player-account.component.css']
})
export class ProfilePlayerAccountComponent implements OnInit {
  gameId: string;

  constructor(private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit() {
    this.gameId = this.route.snapshot.params['gameId'];
    console.log(this.gameId);
  }

  public gotoProfile() : void {
    this.router.navigate(['/profile']);
  }

}
