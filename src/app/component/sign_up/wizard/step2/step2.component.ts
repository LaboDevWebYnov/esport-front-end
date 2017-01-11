import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../../shared/services/user.service';
import {GameService} from '../../../../../shared/services/game.service';
import {Configuration} from '../../../../../shared/app.constants';
import {IsVerifiedRequestObject} from '../../../../../shared/models/utils/is-verified-request-object'
import {RegistrationService} from '../../../../../shared/services/registration.service';
import {User} from "../../../../../shared/models/user";


@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css'],
  providers: [UserService, GameService, RegistrationService, Configuration]

})
export class Step2Component implements OnInit {
  private idParam:string;
  private token: string;
  private userGetById: Object;
  private games: Object;
  private response: Object;
  private verifiedCodeTemp: string;
  //form&http_query status
  status = null;
  submitted = false;
  public errorMessage: string;
  public infoMessage: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userServiceInstance: UserService,
              private gameServiceInstance: GameService,
              private registrationServiceInstance: RegistrationService) {
  }

  ngOnInit() {
    //get the url path&query params
    this.idParam = this.route.snapshot.params['id'];
    this.status = this.route.snapshot.params['status'];
    this.token = this.route.snapshot.params['token'];

    this.getUserById(this.idParam, (userGet: User) => {
      this.getGames();
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
              this.infoMessage = "Main info registered !";
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

    this.isOneChecked(event, "checkboxGame", (isChecked: boolean, selectedGame: string) => {
      if(!isChecked)
      {
        this.status = 401;
        this.infoMessage = null;
        this.errorMessage = "You must select one game to continue ...";
      }
      else
      {
        this.status = 200;
        this.infoMessage = null;
        this.errorMessage = null;
        this.router.navigate(['signup/step3/'+this.token, { id: this.idParam , status: this.status, selectedGame: selectedGame } ]);
      }
    });
  }

  private getUserById(id: string, callback): any {
    this.userServiceInstance
      .GetSingleUserById(id)
      .subscribe(
        data => this.userGetById = data,
        error => console.log(error),
        () => {/*console.log('get User complete', this.userGetById)*/callback(<User>this.userGetById)}
      );
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
          selectedGame = event.target[i].value;
        }
        else
        {
          selectedGame += ':'+event.target[i].value;
        }
        isChecked = true;
        cpt ++;
      }
    }
    callback(isChecked,selectedGame);

  }

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
