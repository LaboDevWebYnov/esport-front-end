import { Component, OnInit } from '@angular/core';
import {Router, RouterLink, ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../../shared/services/user.service';
import {GameService} from '../../../../../shared/services/game.service';
import {Http, HttpModule} from "@angular/Http";
import {Configuration} from '../../../../../shared/app.constants';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css'],
  providers: [UserService, GameService, Configuration]

})
export class Step2Component implements OnInit {
  private idParam:string;
  private token: string;
  userGetById: Object;
  games: Object;
  //form&http_query status
  status = null;
  submitted = false;
  public errorMessage: string;
  public infoMessage: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userServiceInstance: UserService,
              private gameServiceInstance: GameService) {
  }

  ngOnInit() {
    //get the url path&query params
    this.idParam = this.route.snapshot.params['id'];
    this.status = this.route.snapshot.params['status'];
    this.token = this.route.snapshot.params['token'];

    this.infoMessage = "Main info registered !";
    this.getUserById(this.idParam);
    this.getGames();
  }

  //Triggered when the form is submited
  onSubmit(event) {
    //set when the form is submited
    this.submitted = true;

    this.isOneChecked(event, "checkboxGame", (isChecked: boolean, selectedGame: string) => {
      console.log(isChecked, selectedGame);
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

  private getUserById(id: string): void {
    this.userServiceInstance
      .GetSingleUserById(id)
      .subscribe(
        data => this.userGetById = data,
        error => console.log(error),
        () => {/*console.log('get User complete', this.userGetById)*/}
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

}
