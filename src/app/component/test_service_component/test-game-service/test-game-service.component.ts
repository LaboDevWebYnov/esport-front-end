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

  name: 'PES 2017';
  releaseDate: '12-12-2016';
  multiPlayer: true;
  editor: 'KONAMI';
  description: 'Jeu de foot';
  created_at: '2016-12-12';
  str : '';

  addNewGame: Game = {
    _id:"",
    name: "PES 2017",
    releaseDate: new Date(2016,11,30),
    multiPlayer: true,
    id_toornament:"",
    editor: "KONAMI",
    description: "Jeu de foot",
    created_at: new Date(),
    updated_at: new Date()
  };

  updateGame: Game = {
    _id:"",
    name: "FIFA 18",
    releaseDate: new Date(2016,11,30),
    multiPlayer: true,
    editor: "EA Sport 2",
    id_toornament:"",
    description: "Jeu de foot de malade",
    created_at: new Date(2016,11,30),
    updated_at: new Date()
  };

  constructor(private gameServiceInstance: GameService) {
    this.str = '';
    this.name= 'PES 2017';
    this.releaseDate= '12-12-2016';
    this.multiPlayer= true;
    this.editor = 'KONAMI';
    this.description= 'Jeu de foot';
    this.created_at= '2016-12-12';

  }

  private getAllItemsGame(): void {
    this.gameServiceInstance.GetAllGames()
      .subscribe(
        data => this.gamesApiJson = data,
        error => console.log(error),
        () => console.log('get All Games complete', this.gamesApiJson)
      );
  }

  private getItemGameById(id : string): void {
    this.gameServiceInstance
      .GetGameById(id)
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

  private addGameItem(gameName : Game): void {
    console.log(JSON.stringify(gameName));
    this.gameServiceInstance.AddGame(gameName)
      .subscribe(
        data => this.response = data,
        error => console.log(error,this.response),
        () => console.log('Add Game complete', this.response)
      );
  }

  private ChangeGameInfo(id: string, updatedGame: Game): void {
    console.log(JSON.stringify(this.updateGame));
    this.gameServiceInstance
      .ChangeGameInformation(id,updatedGame)
      .subscribe(
        data => this.response = data,
        error => console.log(error),
        () => console.log('Game information change complete',this.response)
      );
  }


  private deleteGame(codeJeu : string): void {
    this.gameServiceInstance.DeleteGame(codeJeu)
      .subscribe(
        data => this.response = data,
        error => console.log(error),
        () => console.log('Delete Game' + codeJeu +' complete', this.response)
      );
  }
  ngOnInit() {
    this.getAllItemsGame();
    //this.getItemGameById();
    //this.getItemGameByName();
    //this.addGameItem();
    //this.deleteGame();
    //this.ChangeGameInfo();
  }


  public onSelectGame(id : string):void{
    console.log("Id " +id);
    this.getItemGameById(id);
  }

  public submitUpdateForm():void{
    var updatedGame: Game = {
      _id:"",
      name: (<HTMLInputElement>document.getElementById('gameName')).value,
      releaseDate:  new Date(),//(<HTMLInputElement>document.getElementById('created_at')).value,//new Date(2016,11,30),
      multiPlayer: true,
      id_toornament:"",
      editor: (<HTMLInputElement>document.getElementById('editor')).value,
      description: (<HTMLInputElement>document.getElementById('description')).value,
      created_at: new Date(),
      updated_at: new Date()
    };
    this.ChangeGameInfo((<HTMLInputElement>document.getElementById('gameId')).value,updatedGame);
    console.log('test update');
  }

  public submitAddForm():void{
    console.log('test add',(<HTMLInputElement>document.getElementById('gameNameAdd')).value);
    var addedGame: Game = {
      _id:"",
      name: (<HTMLInputElement>document.getElementById('gameNameAdd')).value,
      releaseDate:  new Date(),//(<HTMLInputElement>document.getElementById('created_at')).value,//new Date(2016,11,30),
      multiPlayer: true,
      id_toornament:"",
      editor: (<HTMLInputElement>document.getElementById('editorAdd')).value,
      description: (<HTMLInputElement>document.getElementById('descriptAdd')).value,
      created_at: new Date(),
      updated_at: new Date()
    };
    this.addGameItem(addedGame);
    console.log('test add');
  }

}
