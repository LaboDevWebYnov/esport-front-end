import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../../shared/services/game.service';
import {Configuration} from "../../../../shared/app.constants";
import { Team } from "../../../../shared/models/team";
import {ToornamentService} from "../../../../shared/services/toornament.service";

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css'],
  providers: [ToornamentService, Configuration, GameService]
})
export class TournamentsComponent implements OnInit {
  private games: Object;
  public isFilteredGameId: any;
  public tournaments;
  public discipline;
  params = [];

  constructor(private ToornamentServiceInstance: ToornamentService,
    private gameServiceInstance: GameService) {

  }

  ngOnInit() {
    this.getGames();
    this.getAllTournaments();

  }

  public checkFilter(gameIdFiltered: string)
  {
    this.isFilteredGameId = gameIdFiltered;
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

  private getAllTournamentsByDiscipline(toornamentGameId): void {
    console.log(toornamentGameId);
    if(toornamentGameId) {
      this.params["discipline"] = toornamentGameId;
    }
    this.ToornamentServiceInstance
      .getTournaments(this.params)
      .subscribe(
        data => this.tournaments = data,
        error => console.log(error),
        () => {
          console.log('get all tournaments by discipline complete', this.tournaments);
        }
      );
  }

  private getAllTournaments(): void {
    this.params["country"] = "FR";
    this.params["discipline"] = "";

    this.ToornamentServiceInstance
      .getTournaments(this.params)
      .subscribe(
        data => this.tournaments = data,
        error => console.log(error),
        () => {
          console.log('get all tournaments complete', this.tournaments);
        }
      );
  }

  private onSubmit(event): void{
    this.params["name"] = event.target[0].value;

    console.log('get tournaments by PREsearch', this.tournaments);

    this.ToornamentServiceInstance
      .getTournaments(this.params)
      .subscribe(
        data => this.tournaments = data,
        error => console.log(error),
        () => {
          console.log('get tournaments by search', this.tournaments);
        }
      );
  }
}
