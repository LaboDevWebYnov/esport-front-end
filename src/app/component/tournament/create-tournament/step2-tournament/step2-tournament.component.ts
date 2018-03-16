import { Component, OnInit } from '@angular/core';
import {GameService} from '../../../../../shared/services/game.service';
import {ToornamentService} from '../../../../../shared/services/toornament.service';
import {Router} from '@angular/router';
import { CoolLocalStorage } from 'angular2-cool-storage';

@Component({
  selector: 'app-step2-tournament',
  templateUrl: './step2-tournament.component.html',
  styleUrls: ['./step2-tournament.component.css'],
  providers: [GameService, ToornamentService]
})
export class Step2TournamentComponent implements OnInit {

  private games: Object;
  private nombres;
  localStorage: CoolLocalStorage;

  constructor(private gameServiceInstance: GameService,
              private toornament: ToornamentService,
              private router: Router,
              localStorage: CoolLocalStorage) {
    this.localStorage = localStorage;
  }

  ngOnInit() {
    this.getGames();

    let numbers = Array();
    for(let i = 2; i < 257; i++){
      numbers.push(i);
    }
    this.nombres = numbers;
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

  onSubmit(event) {

    let tournoi;
    let name = this.localStorage.getItem('tooName');
    let participant_type = event.target[0].value;
    let size = event.target[2].value;
    let discipline = event.target[3].value;

    /*params['organisation'] = this.localStorage.getItem('tooOrganizer');
    params['website'] = this.localStorage.getItem('tooUrl');
    params['full_name'] = this.localStorage.getItem('tooDescription');*/

    this.toornament.addTournament(discipline, name, size, participant_type, this.localStorage.getItem('userId'))
      .subscribe(
        data => tournoi = data,
        error => console.log(error),
        () => {console.log('insert tournoi', tournoi)}
      );

    //this.router.navigate(['home']);
  };

}
