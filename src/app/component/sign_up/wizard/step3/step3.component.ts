import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {IsVerifiedRequestObject} from '../../../../../shared/models/utils/is-verified-request-object'
import {RegistrationService} from '../../../../../shared/services/registration.service';
import {User} from "../../../../../shared/models/user";
import {UserService} from '../../../../../shared/services/user.service';
import {GameService} from '../../../../../shared/services/game.service';
import {Configuration} from '../../../../../shared/app.constants';
import {Game} from "../../../../../shared/models/game";



@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css'],
  providers: [UserService, GameService, RegistrationService, Configuration]

})
export class Step3Component implements OnInit {
  private idParam:string;
  private token: string;
  private userGetById: Object;
  private games: Object;
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
              private registrationServiceInstance: RegistrationService) {

}

  private getAllItemsGame(): void {
    this.gameServiceInstance.GetAllGames()
      .subscribe(
        data => this.gamesApiJson = data,
        error => console.log(error),
        () => console.log('get All Games complete', this.gamesApiJson)
      );
    this.displayForms();
  }

  private formById(idGame:string,idNum:number){
    let gameName;
    let inputPlaceHolder;
    console.log(this.gamesApiJson);
    for(let x=0;x in this.gamesApiJson;x++){
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
    let form = "<form (ngSubmit)='createPlayerAccount('" + idGame + "','playerAccount" + idNum + "')>" +
      "<p>" + gameName + " : </p>" +
      "<input type='text' id=playerAccount'" + idNum + "' placeholder='" + inputPlaceHolder + "'>" +
      "<button>Valider</button>" +
      "</form>";

    return form;
  }

  private displayForms(): void {
    let gamesId = this.selectedGame.split(":");

    console.log(this.divForms);

    for(let y=0;y<gamesId.length;y++){
      this.divForms[y] = this.formById(gamesId[y],y);
    }
  }

  createPlayerAccount(gameId:string,inputId:string){
    console.log(gameId);
    console.log(inputId);
  }

  ngOnInit() {
    //get the url path&query params
    this.idParam = this.route.snapshot.params['id'];
    this.status = this.route.snapshot.params['status'];
    this.token = this.route.snapshot.params['token'];
    this.selectedGame = this.route.snapshot.params['selectedGame'];
    console.log(this.idParam, this.token, this.status, this.selectedGame);
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

        this.router.navigate(['signup/step4/'+this.token, { id: this.idParam , status: this.status } ]);
  };

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
