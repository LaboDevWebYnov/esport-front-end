import { Component, OnInit } from '@angular/core';
import {GameService} from "../../../../shared/services/game.service";
import { Configuration } from '../../../../shared/app.constants';
import {CoolLocalStorage} from "angular2-cool-storage";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-player-account-details',
  templateUrl: './player-account-details.component.html',
  styleUrls: ['./player-account-details.component.css'],
  providers:[GameService,Configuration]

})
export class PlayerAccountDetailsComponent implements OnInit {
  localStorage: CoolLocalStorage;
  gameId: string;

  constructor(private route: ActivatedRoute,
              private gameServiceInstance: GameService,
              localStorage: CoolLocalStorage) {
    this.localStorage = localStorage;
  }

  ngOnInit() {
    this.gameId = this.route.snapshot.params['gameId'];
    console.log(this.gameId);
  }

  // Doughnut
  public RatioChartType:string = 'doughnut';
  public RatioLabels:string[] = ['Win', 'Draw', 'Lose'];
  public RatioData:number[] = [52, 12, 36];

  public statsChartType:string = 'doughnut';
  public statsLabels:string[] = ['Win', 'Draw', 'Lose'];
  public statsData:number[] = [52, 12, 36];

  public activityChartType:string = 'doughnut';
  public activityLabels:string[] = ['Win', 'Draw', 'Lose'];
  public activityData:number[] = [52, 12, 36];

  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }

}
