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
  private idToornament: any;
  private soloOrTeam: any;
  private tournoi;
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

  public checkFilter(gameIdFiltered: string)
  {
    this.idToornament = gameIdFiltered;
  }
  public checkSoloTeam(soloOrTeam: string)
  {
    this.soloOrTeam = soloOrTeam;
  }

  onSubmit(event) {

    let name = this.localStorage.getItem('tooName');
    let participant_type = this.soloOrTeam;
    let size = event.target[2].value;
    let discipline = this.idToornament;

    /*params['organisation'] = this.localStorage.getItem('tooOrganizer');
    params['website'] = this.localStorage.getItem('tooUrl');
    params['full_name'] = this.localStorage.getItem('tooDescription');*/

    this.toornament.addTournament(discipline, name, size, participant_type, this.localStorage.getItem('userId'))
      .subscribe(
        data => this.tournoi = data,
        error => console.log(error),
        () => {
          console.log(this.tournoi);
          let modal = (<HTMLInputElement>document.getElementById("globalmodal"));
          modal.style.display = "flex";
        }
      );
  };

  public goDetails(){
    this.router.navigate(['events/detail/1309051935825371136']);
  }

  public openInvite(clicked){
    let invit = (<HTMLInputElement>document.getElementById("invit"));
    if(clicked){
      invit.style.display = "none";
    }
    else {
      invit.style.display = "block";
    }
  }

  public invite(){
    let input = (<HTMLInputElement>document.getElementById("pseudo"));
    let pseudo = input.value;

    let participant;
    this.toornament.addParticipantByTournamentId('1309051935825371136', pseudo).subscribe(
      data => participant = data,
      error => console.log(error),
      () => {
        let list = (<HTMLElement>document.getElementById("listPlayers"));
        let div = document.createElement('div');
        div.textContent = pseudo;
        list.appendChild(div);
      }
    );
  }
}
