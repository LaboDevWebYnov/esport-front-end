import { Component, OnInit } from '@angular/core';
import {GameService} from '../../../../../shared/services/game.service';
import {Configuration} from "../../../../../shared/app.constants";
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-step2-team',
  templateUrl: './step2-team.component.html',
  styleUrls: ['./step2-team.component.css'],
  providers: [GameService, Configuration]
})
export class Step2TeamComponent implements OnInit {

  private games: Object;
  constructor(private gameServiceInstance: GameService, private router: Router) { }

  ngOnInit() {
    this.getGames();
  }

  private getGames(): void {
    this.gameServiceInstance
      .GetAllGames()
      .subscribe(
        data => this.games = data,
        error => console.log(error),
        () => {/*console.log('get all games complete', this.games)*/}
      );
  }
  onNext() {
    this.router.navigate(['team/create-team/step3-team']);
  }
}
