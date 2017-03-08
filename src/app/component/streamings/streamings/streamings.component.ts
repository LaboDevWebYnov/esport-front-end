import { Component, OnInit } from '@angular/core';
import {GameService} from "../../../../shared/services/game.service";
import {Configuration} from "../../../../shared/app.constants";

@Component({
  selector: 'app-streamings',
  templateUrl: './streamings.component.html',
  styleUrls: ['./streamings.component.css'],
  providers: [Configuration,GameService]

})
export class StreamingsComponent implements OnInit {
  private games: Object;
  public isFilteredGameId: any;

  constructor(private gameServiceInstance: GameService
  ) { }

  ngOnInit() {
    this.getGames();
  }

  public checkFilter(gameIdFiltered: string)
  {
    this.isFilteredGameId = gameIdFiltered;
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
}
