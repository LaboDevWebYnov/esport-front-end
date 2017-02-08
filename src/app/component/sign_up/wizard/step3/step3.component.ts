import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {IsVerifiedRequestObject} from '../../../../../shared/models/utils/is-verified-request-object'
import {RegistrationService} from '../../../../../shared/services/registration.service';
import {User} from "../../../../../shared/models/user";
import {UserService} from '../../../../../shared/services/user.service';
import {GameService} from '../../../../../shared/services/game.service';
import {Configuration} from '../../../../../shared/app.constants';
import {Game} from "../../../../../shared/models/game";
import { PlayerAccountService } from '../../../../../shared/services/player-account.service';
import { AddNewPlayerAccount } from '../../../../../shared/models/utils/create-player-account-object';


@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css'],
  providers: [UserService, GameService, RegistrationService, Configuration, PlayerAccountService]

})
export class Step3Component implements OnInit {
  private idParam:string;
  private token: string;
  private userGetById: Object;
  private selectedGame: string;
  private response: Object;
  private verifiedCodeTemp: string;
  //form&http_query status
  status = null;
  submitted = false;
  public errorMessage: string;
  public infoMessage: string;
  gamesApiJson: Object;
  divForms = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userServiceInstance: UserService,
              private gameServiceInstance: GameService,
              private registrationServiceInstance: RegistrationService,
              private playerAccountServiceInstance: PlayerAccountService) {

}

  private getAllItemsGame(): void {
    this.gameServiceInstance.GetAllGames()
      .subscribe(
        data => this.gamesApiJson = data,
        error => console.log(error),
        () => {
          this.displayForms();
        }
      );
  }

  private formById(idGame:string,idNum:number){
    let gameName;
    let inputPlaceHolder;
    let games = <Game>this.gamesApiJson;
    for(let x=0;x in games;x++){
      let game : Game = <Game>this.gamesApiJson[x];
      if(game._id==idGame){
        gameName = game.name;

        if(gameName=='League of Legends'){
          inputPlaceHolder="entrez votre pseudo LOL";
        }
        else if (gameName=='Counter-Strike: Global Offensive'){
          inputPlaceHolder="entrez votre Steam Id";
        }
        else if (gameName=='OverWatch'){
          inputPlaceHolder="entrez votre pseudo Overwatch";
        }
        else if (gameName=='DOTA2'){
          inputPlaceHolder="entrez votre pseudo DOTA 2";
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

  createPlayerAccount(inputId:string){
    console.log("playerAccount"+inputId);
    console.log((<HTMLInputElement>document.getElementById("playerAccount"+inputId)).value);

    let playerAccount: AddNewPlayerAccount = {
      login : (<HTMLInputElement>document.getElementById("playerAccount"+inputId)).value
    };
    let userid = this.idParam;
    this.addPlayerAccount(playerAccount,userid,this.divForms[inputId].gameId);
    this.divForms[inputId].create = true;
    let isAllPayerAccountCreate = true;
    for(let y=0;y < this.divForms.length;y++){
      if(this.divForms[y].create == 'false'){
        isAllPayerAccountCreate = false;
      }
    }
    if(!isAllPayerAccountCreate){
      (<HTMLElement>document.getElementById("submitButton")).removeAttribute('disabled')
    }
  }

  ngOnInit() {
    //get the url path&query params
    this.idParam = this.route.snapshot.params['id'];
    this.status = this.route.snapshot.params['status'];
    this.token = this.route.snapshot.params['token'];
    this.selectedGame = this.route.snapshot.params['selectedGame'];
    this.getAllItemsGame();


    this.getUserById(this.idParam, (userGet: User) => {
      //check if the user is already verified
      this.isVerifiedUser(userGet.email, this.token, (verifiedCode: string, userId: string) => {
        this.verifiedCodeTemp = verifiedCode;
        if (verifiedCode === 'E_NOT_VERIFIED') {
          this.router.navigate(['/']);
        }
        else {
          if (verifiedCode === 'E_BAD_TOKEN') {
            this.status = 401;
            this.errorMessage = 'Demande de création de compte invalide ! Merci de bien vouloir vour réinscrire. ';
            this.infoMessage = null;
          }
          else {
            if (verifiedCode === 'E_EXPIRED_TOKEN') {
              this.status = 401;
              this.errorMessage = 'Demande de création de compte expirée ! Merci de bien vouloir vour réinscrire.';
              this.infoMessage = null;
            }
            //verifiedCode === 'VERIFIED'
            else {
              this.status = 200;
              this.errorMessage = null;
              this.infoMessage = "Game selected !";
            }
          }
        }
      });
    });
  }

  //Triggered when the form is submited
  onSubmit(event) {
    //set when the form is submited
    this.submitted = true;
    var addPlayerAccount: AddNewPlayerAccount = {
      login: (<HTMLInputElement>document.getElementById('login')).value,

    };
    // var userid = this.idParam;
    // var gameid = this.selectedGame;
    //
    // this.playerAccountServiceInstance.AddPlayerAccount(addPlayerAccount, userid, gameid)
    //   .subscribe(
    //     data => console.log("ok"),
    //     error => console.log(error),
    //     () => {console.log('get succes')}
    //   );
    //
    //     this.router.navigate(['signup/step4/'+this.token, { id: this.idParam , status: this.status } ]);
  };

  private addPlayerAccount(addPlayerAccount : AddNewPlayerAccount, userid : string, gameid : string): void {

    this.playerAccountServiceInstance
      .AddPlayerAccount(addPlayerAccount, userid, gameid)
      .subscribe(
        data => this.response = data,
        error => console.log(error,this.response),
        () => console.log('Add player account complete', this.response)
      );
  }

  private getUserById(id: string, callback): any {
    this.userServiceInstance
      .GetSingleUserById(id)
      .subscribe(
        data => this.userGetById = data,
        error => console.log(error),
        () => {/*console.log('get User complete', this.userGetById)*/callback(<User>this.userGetById)}
      );
  };

  //check if the user is already verified and the token is available
  private isVerifiedUser = (email: string, token: string, callback): any => {
    this.registrationServiceInstance
      .isVerified(email, token)
      .subscribe(
        data => {
          this.response = data;
        },
        error => {
          console.log(error);
        },
        () => {
          //console.log(this.response);
          callback((<IsVerifiedRequestObject>this.response).verifiedCode,
            (<IsVerifiedRequestObject>this.response).userId);
        }
      );
  };

}
