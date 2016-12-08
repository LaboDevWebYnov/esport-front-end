import { GameService } from '../../../../shared/services/game.service';
import { Component, OnInit } from '@angular/core';
import {Configuration} from "../../../../shared/app.constants";
import {Game} from "../../../../shared/models/game";

@Component({
  selector: 'app-test-game-service',
  templateUrl: './test-game-service.component.html',
  styleUrls: ['./test-game-service.component.css'],
  providers:[GameService, Configuration]
})
export class TestGameServiceComponent implements OnInit {

  gamesApiJson: Object;
  gameGetById: Object;
  gameGetByName: Object;
  response: Object;

  addNewGame: Game = {
    name: "Fifa 17",
    releaseDate: new Date(2016,11,30),
    multiPlayer: true,
    editor: "EA Sport",
    description: "Jeu de foot",
    created_at: new Date(),
    updated_at: new Date()
  };

  updateGame: Game = {
    name: "FIFA 18",
    releaseDate: new Date(2016,11,30),
    multiPlayer: true,
    editor: "EA Sport 2",
    description: "Jeu de foot de malade",
    created_at: new Date(2016,11,30),
    updated_at: new Date()
  };

  constructor(private gameServiceInstance: GameService) { }

  private getAllItemsGame(): void {
    this.gameServiceInstance.GetAllGames()
      .subscribe(
        data => this.gamesApiJson = data,
        error => console.log(error),
        () => console.log('get All Games complete', this.gamesApiJson)
      );
  }

  private getItemGameById(): void {
    this.gameServiceInstance
      .GetGameById("569104a0417130681bcf1586")
      .subscribe(
        data => this.gameGetById = data,
        error => console.log(error),
        () => console.log('get Game By Id complete',this.gameGetById)//console.log('get All Items complete')
      );
  }

  private getItemGameByName(): void {
    this.gameServiceInstance.GetGameByName('string')
      .subscribe(
        data => this.gameGetByName = data,
        error => console.log(error),
        () => console.log('get Game By Name complete',this.gameGetByName)//console.log('get All Items complete')
      );
  }

  private addGameItem(): void {
    console.log(JSON.stringify(this.addNewGame));
    this.gameServiceInstance.AddGame(this.addNewGame)
      .subscribe(
        data => this.response = data,
        error => console.log(error,this.response),
        () => console.log('Add Game complete', this.response)
      );
  }

  private ChangeGameInfo(): void {
    console.log(JSON.stringify(this.updateGame));
    this.gameServiceInstance
      .ChangeGameInformation("583edfa220fd3811ecdcdf0d",this.updateGame)
      .subscribe(
        data => this.response = data,
        error => console.log(error),
        () => console.log('Game information change complete',this.response)
      );
  }


  private deleteGame(): void {
    this.gameServiceInstance.DeleteGame("583edfa220fd3811ecdcdf0d")
      .subscribe(
        data => this.response = data,
        error => console.log(error),
        () => console.log('Delete Game complete', this.response)
      );
  }
  ngOnInit() {
    this.getAllItemsGame();
    this.getItemGameById();
    this.getItemGameByName();
    this.addGameItem();
    this.deleteGame();
    this.ChangeGameInfo();
  }

}
