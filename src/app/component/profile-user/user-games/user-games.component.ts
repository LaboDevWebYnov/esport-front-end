import { Component, OnInit, Input } from '@angular/core';
import {GameService} from "../../../../shared/services/game.service";
import { PlayerAccountService } from '../../../../shared/services/player-account.service';
import {CoolLocalStorage} from "angular2-cool-storage";
import { Configuration } from '../../../../shared/app.constants';
import {Game} from "../../../../shared/models/game";
import {forEach} from "@angular/router/src/utils/collection";
import { AddNewPlayerAccount } from '../../../../shared/models/utils/create-player-account-object';
import {Router} from "@angular/router";



@Component({
  selector: 'app-user-games',
  templateUrl: './user-games.component.html',
  styleUrls: ['./user-games.component.css'],
  providers:[GameService,PlayerAccountService,Configuration]

})
export class UserGamesComponent implements OnInit {
  localStorage: CoolLocalStorage;
  private userGames: Object;
  private games: Object;
  private selectedGame: String;
  divForms = [];
  private response: Object;
  @Input('master') masterName: string;

  constructor(private gameServiceInstance: GameService,
              private playerAccountServiceInstance: PlayerAccountService,
              localStorage: CoolLocalStorage) {
    this.localStorage = localStorage;
  }

  //UTILITAIRE
  public openSelectGameModal() :void{
    (<HTMLElement>document.getElementById("selectGameModal")).style.display = "block";
  }

  public closeSelectGameModal() :void{
    for(let i = 0; i < document.getElementsByClassName("checkboxGameSelection").length; i++)
    {
      (<HTMLInputElement>document.getElementsByClassName("checkboxGameSelection")[i]).checked = false;
    }
    (<HTMLElement>document.getElementById("selectGameModal")).style.display = "none";
  }

  public openAddPlayerModal() :void{
    (<HTMLElement>document.getElementById("addPlayerAccountModal")).style.display = "block";
  }

  public closeAddPlayerModal() :void{
    for(let i = 0; i < document.getElementsByClassName("checkboxGameSelection").length; i++)
    {
      (<HTMLInputElement>document.getElementsByClassName("checkboxGameSelection")[i]).checked = false;
    }
    (<HTMLElement>document.getElementById("addPlayerAccountModal")).style.display = "none";
  }
  private getUserGame(idUser: string) {
    this.gameServiceInstance
      .GetUserGames(idUser)
      .subscribe(
        data => this.userGames = data,
        error => {
            console.log(error)
        },
        () => {
              //console.log('get user\'s games complete', this.userGames),
            }
      );
  }
  private getGame() {
    this.gameServiceInstance
      .GetAllGames()
      .subscribe(
        data => this.games = data,
        error => {
          console.log(error)
        },
        () => {
          console.log('get  games complete', this.games)
        }
      );
  }
  private addPlayerAccount(addPlayerAccount : AddNewPlayerAccount, userid : string, gameid : string, callback): void {

    this.playerAccountServiceInstance
      .AddPlayerAccount(addPlayerAccount, userid, gameid)
      .subscribe(
        data => this.response = data,
        error => {
                    console.log(error,this.response),
                      callback(null, error.message)
                 },
        () => {
                  console.log('Add player account complete', this.response);
                  callback(this.response, null);
        }
      );
  }

  createPlayerAccount(inputId:string){
    let isAllPayerAccountCreate = true;
    let userId = this.localStorage.getItem('userId');
    console.log("bim clicked");

    console.log("playerAccount"+inputId);
    console.log((<HTMLInputElement>document.getElementById("playerAccount"+inputId)).value);
    ((<HTMLInputElement>document.getElementById("playerAccount"+inputId)).disabled) = false;
    let playerAccount: AddNewPlayerAccount = {
      login : (<HTMLInputElement>document.getElementById("playerAccount"+inputId)).value
    };
    this.addPlayerAccount(playerAccount,userId,this.divForms[inputId].gameId, (response: Object, errorMessage: string) : any => {
      console.log(response);
      if(response != null)
      {
        this.divForms[inputId].create = true;

        (<HTMLInputElement>document.getElementById("playerAccount"+inputId)).disabled = true;
        (<HTMLInputElement>document.getElementById("playerAccount"+inputId)).className += ' validPlayerAccount';
        (<HTMLInputElement>document.getElementById("AddPlayerAccountBtn"+inputId)).disabled = false;

        for(let y=0;y < this.divForms.length;y++){
          console.log(this.divForms[y].create);
          if(this.divForms[y].create == false){
            isAllPayerAccountCreate = false;
          }
        }

        if(isAllPayerAccountCreate){
          (<HTMLElement>document.getElementById("AddPlayerSubmitButton")).removeAttribute('disabled')
        }
      }

    });
  }

  private isOneChecked(event: any, className: string, callback): any {
    let selectedGame = "";
    let cpt = 0;
    let isChecked = false;
    for(let i=0;i<document.getElementsByClassName(className).length;i++)
    {
      if(event.target[i].checked)
      {
        if(cpt == 0)
        {
          selectedGame = event.target[i].id;
          console.log("ici c'est le if");
        }
        else
        {
          selectedGame += ':'+event.target[i].id;
          console.log("ici c'est le else");
        }
        isChecked = true;
        cpt ++;
      }
    }
    callback(isChecked,selectedGame);

  }

  private formById(idGame:string,idNum:number){
    let gameName;
    let inputPlaceHolder;
    let games = <Game>this.games;
    for(let x=0;x in games;x++){
      let game : Game = <Game>this.games[x];
      if(game._id==idGame){
        gameName = game.name;

        if(gameName=='League of Legends'){
          inputPlaceHolder="entrez votre pseudo LOL";
        }
        else if (gameName=='Counter-Strike: Global Offensive'){
          inputPlaceHolder="entrez votre Steam Id";
        }
        else if (gameName=='OverWatch'){
          inputPlaceHolder="entrez votre battleTag";
        }
        else if (gameName=='DOTA2'){
          inputPlaceHolder="entrez votre steam Id";
        }
        else if (gameName=='Rocket League'){
          inputPlaceHolder="entrez votre steam Id";
        }
        else if (gameName=='Rainbow six Siege'){
          inputPlaceHolder="entrez votre id rainbow six siege";
        }
      }
    }
    let response = {
      placeHolder:inputPlaceHolder,
      gameName:gameName,
      gameId:idGame,
      create:false,
    };
    return response;
  }

  private displayForms(): void {
    let gamesId = this.selectedGame.split(":");

    for(let y=0;y<gamesId.length;y++){
      this.divForms[y] = this.formById(gamesId[y],y);
    }
  }

  addGame(event): void {
console.log("a clicked");
    this.isOneChecked(event, "checkboxGameSelection", (isChecked: boolean, selectedGame: string) => {
      console.log("if checked"+isChecked);
      if(!isChecked)
      {
        console.log('no game selected');
      }
      else
      {
        console.log("selected game"+selectedGame);
        this.selectedGame = selectedGame;
        this.closeSelectGameModal();
        this.openAddPlayerModal();
        this.displayForms();
      }
    });
  }

  onSubmit() {
    location.reload();
  }

  ngOnInit() {
    //this.getGame();
    let id = this.localStorage.getItem('userId');

    this.getUserGame(id);
    this.getGame();
    console.log("gay"+this.masterName);


  }

}
