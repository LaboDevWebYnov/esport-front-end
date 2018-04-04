import {Component, Input, OnInit} from '@angular/core';
import { Configuration } from '../../../../../shared/app.constants';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { ToornamentService } from '../../../../../shared/services/toornament.service';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.css'],
  roviders: [Configuration, ToornamentService],
})
export class InformationsComponent implements OnInit {
  @Input('prize') prize: string;
  @Input('rules') rules: string;
  @Input('description') description: string;
  // @Input('prize') prize: string;

  loclaStorage: CoolLocalStorage;

  public tournamentInfo = {
    Desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aperiam architecto cupiditate delectus deleniti ex " +
    "laboriosam minima possimus quae quasi quis quisquam tempore, ullam. Ab adipisci magnam mollitia sequi temporibus.",
    Rules: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam asperiores at cupiditate," +
    " dolor, ea eaque facilis harum illo laboriosam minima natus quis quo sint temporibus vero vitae! Quisquam, repellat?",
    BO1: "Direct eliminations",
    BO3: "Best-of 3 for win",
    Cash: "2 000 000 €"
  };

  public toornamentObj: object;
  public toornamentCountry: string;
  public participants: object;
  tournamentId: string;


  constructor(private route: ActivatedRoute, private toornamentService: ToornamentService) { }

  ngOnInit() {
    this.tournamentId = this.route.snapshot.params['toornamentId'];
    this.getInformationsByToornaments(this.tournamentId);
    this.tournamentId = this.route.snapshot.params['toornamentId'];
    this.getParticipantsByToornaments(this.tournamentId);
  }

  private getInformationsByToornaments(tournamentid: string)
  {
    this.toornamentService.getTournamentById(tournamentid)
      .subscribe(
        data => this.toornamentObj = data,
        error => console.log(error),
        () => {
          console.log("on a get le tournois", this.toornamentObj);
        }
      );
  }

  private getParticipantsByToornaments(tournamentid: string)
  {
    this.toornamentService.getParticipantsByTournament(tournamentid, [])
      .subscribe(
        data => this.participants = data,
        error => console.log(error),
        () => {
          console.log("on a get les participant", this.participants);
        }
      );
  }
}
