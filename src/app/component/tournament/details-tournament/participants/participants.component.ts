import { Component, OnInit } from '@angular/core';
import { ToornamentService } from '../../../../../shared/services/toornament.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css'],
  providers: [ToornamentService]
})
export class ParticipantsComponent implements OnInit {

  participants: object;
  toornamentId: string;

  constructor(private route: ActivatedRoute, private toornamentService: ToornamentService) {
  }

  ngOnInit() {
    this.toornamentId = this.route.snapshot.params['toornamentId']
    this.getParticipantsByToornaments(this.toornamentId);
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

