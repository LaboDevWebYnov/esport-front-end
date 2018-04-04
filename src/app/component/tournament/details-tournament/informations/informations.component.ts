import {Component, Input, OnInit} from '@angular/core';
import { Configuration } from '../../../../../shared/app.constants';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { ToornamentService } from '../../../../../shared/services/toornament.service';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.css'],
  providers: [Configuration, ToornamentService],
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

    console.log(this.findPlateformLogo("4"))
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

  public dateConvertor (date: string) {
    let dateFormat = new Date(date)

    let day = dateFormat.getDate() < 10 ? "0" + dateFormat.getDate() : dateFormat.getDate()
    let month = dateFormat.getMonth() < 10 ? "0" + dateFormat.getMonth() : dateFormat.getMonth()

    var newDate = day + "/" + month + "/" + dateFormat.getFullYear()
    return newDate
  }

  public findPlateformLogo (plateformString: String) {
    switch (plateformString) {
      case "pc": {
        return '<i class="fas fa-laptop" style="font-family: \'Font Awesome 5 Free\'"></i>';
      }
      case "playstation4": {
        return '<i class="fab fa-playstation" style="font-family: \'Font Awesome 5 Free\'"></i>';
      }
      case "playstation3": {
        return '<i class="fab fa-playstation" style="font-family: \'Font Awesome 5 Free\'"></i>';
      }
      case "playstation2": {
        return '<i class="fab fa-playstation" style="font-family: \'Font Awesome 5 Free\'"></i>';
      }
      case "playstation1": {
        return '<i class="fab fa-playstation" style="font-family: \'Font Awesome 5 Free\'"></i>';
      }
      case "ps_vita": {
        return '<i class="fab fa-playstation" style="font-family: \'Font Awesome 5 Free\'"></i>';
      }
      case "psp": {
        return '<i class="fab fa-playstation" style="font-family: \'Font Awesome 5 Free\'"></i>';
      }
      case "xbox_one": {
        return '<i class="fab fa-xbox" style="font-family: \'Font Awesome 5 Free\'"></i>';
      }
      case "xbox360": {
        return '<i class="fab fa-xbox" style="font-family: \'Font Awesome 5 Free\'"></i>';
      }
      case "xbox": {
        return '<i class="fab fa-xbox" style="font-family: \'Font Awesome 5 Free\'"></i>';
      }
      case "nintendo_switch": {
        return '<i class="fab fa-nintendo-switch" style="font-family: \'Font Awesome 5 Free\'"></i>';
      }
      case "mobile": {
        return '<i class="fas fa-mobile" style="font-family: \'Font Awesome 5 Free\'"></i>';
      }
      default: {
        return '<i class="fas fa-gamepad" style="font-family: \'Font Awesome 5 Free\'"></i> ' + plateformString;
      }
    }
  }
}
