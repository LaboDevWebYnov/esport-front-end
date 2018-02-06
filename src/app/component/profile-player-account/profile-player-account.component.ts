import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from "@angular/router";
import {PlayerAccountService} from "../../../shared/services/player-account.service";
import {CoolLocalStorage} from "angular2-cool-storage";
import {GameService} from "../../../shared/services/game.service";
import 'rxjs/add/operator/switchMap';
import {AddNewPlayerAccount} from "../../../shared/models/utils/create-player-account-object";
import {Game} from "../../../shared/models/game";
import {PlayerAccount} from "../../../shared/models/player-account";
import {Configuration} from "shared/app.constants";


@Component({
  selector: 'app-profile-player-account',
  templateUrl: './profile-player-account.component.html',
  styleUrls: ['./profile-player-account.component.css'],
  providers: [PlayerAccountService, Configuration,GameService]
})
export class ProfilePlayerAccountComponent implements OnInit, OnDestroy {

  playerAccount: PlayerAccount;
  playerAccountAll: Object;
  gameId: string;
  login: string;
  localStorage: CoolLocalStorage;
  private userGames: Object;
  private games: Object;
  private selectedGame: String;
  divForms = [];
  private response: Object;
  private playerAccountId;
  private sub: any;

  constructor(private gameServiceInstance: GameService,
              private playerAccountServiceInstance: PlayerAccountService, private route: ActivatedRoute,
              private router: Router,localStorage: CoolLocalStorage) { this.localStorage = localStorage}

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.playerAccountId = params['playerAccountId']; // (+) converts string 'id' to a number

      let id = this.localStorage.getItem('userId');



      this.getPlayerAccountById(this.playerAccountId,(gameId: string,login: string) => {
        this.gameId = gameId;
        this.login = login;
        console.log(this.gameId);
        this.localStorage.setItem('gameId',this.gameId);
        this.getPlayerAccount(id,this.gameId);


      });
      // In a real app: dispatch action to load the details here.
    });




  }
  ngOnDestroy()
  {
    this.sub.unsubscribe();
  }

  public gotoProfile($event) : void {
    console.log($event);
    //this.router.navigate(['/profile']);
    this.openAddPlayerModal();
  }

  public goToOther(event: string) : void {
    console.log(event);
    this.router.navigate(['player-account/', event]);
  }

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

  private getUserGame(idUser: string, callback): any {
    this.gameServiceInstance
      .GetUserGames(idUser)
      .subscribe(
        data => this.userGames = data,
        error => {
          console.log(error),
            callback(null, error.message)
        },
        () => {
          //console.log('get user\'s games complete', this.userGames),
          callback(this.userGames, null)
        }
      );

  }

  private getGames(callback): any {
    this.gameServiceInstance
      .GetAllGames()
      .subscribe(
        data => this.games = data,
        error => {
          console.log(error),
            callback(null, error.message)
        },
        () => {
          //console.log('Add player account complete', this.games);
          callback(this.games, null);
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

    console.log("playerAccount"+inputId);
    console.log((<HTMLInputElement>document.getElementById("playerAccount"+inputId)).value);

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
        (<HTMLInputElement>document.getElementById("AddPlayerAccountBtn"+inputId)).disabled = true;

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
        }
        else
        {
          selectedGame += ':'+event.target[i].id;
        }
        isChecked = true;
        cpt ++;
      }
    }
    callback(isChecked,selectedGame);

  }

  private formById(idGame:string,idNum:number){
    let gameName;
    gameName ='Counter-Strike: Global Offensive';
    let inputPlaceHolder;
    let games = <Game>this.games;
    for(let x=0;x in games;x++){
      let game : Game = <Game>this.games[x];
      if(game._id==idGame){
        gameName = game.name;
        gameName ='Counter-Strike: Global Offensive';

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
    this.isOneChecked(event, "checkboxGameSelection", (isChecked: boolean, selectedGame: string) => {
      if(!isChecked)
      {
        console.log('no game selected');
      }
      else
      {
        console.log(selectedGame);
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






  private getPlayerAccountById = (playerAccountId: string, callback): any => {
    this.playerAccountServiceInstance
      .GetSinglePlayerAccountById(playerAccountId)
      .subscribe(
        data => {this.playerAccount = data},
        error => {console.log(error)},
        () => {
          callback(this.playerAccount.game._id, this.playerAccount.login);

        }
      );


};
private getPlayerAccount(userId: string, gameId: string): void {
  this.playerAccountServiceInstance
    .GetPlayerAccountByUserIdByGame(userId, gameId)
    .subscribe(
      data => this.playerAccountAll = data,
      error => console.log(error),
      () => {
        console.log('get all the fucking pa', this.playerAccountAll);

      }
    );


}}
