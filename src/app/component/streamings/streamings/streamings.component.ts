import { Component, OnInit } from '@angular/core';
import {GameService} from "../../../../shared/services/game.service";
import {StreamingService} from '../../../../shared/services/streaming.service';
import {Configuration} from "../../../../shared/app.constants";

@Component({
  selector: 'app-streamings',
  templateUrl: './streamings.component.html',
  styleUrls: ['./streamings.component.css'],
  providers: [Configuration,GameService, StreamingService]

})
export class StreamingsComponent implements OnInit {
  private games: Object;
  private liveStream: Object;
  private searchStream: Object;
  public isFilteredGameId: any;

  constructor(private gameServiceInstance: GameService,
              private streamingServiceInstance: StreamingService
  ) {
    this.getLiveStream();
  }

  ngOnInit() {
    this.getGames();
  }

  public checkFilter(gameIdFiltered: string)
  {
    this.isFilteredGameId = gameIdFiltered;
  }

  public onChangeSearchStream(event) {
    console.log(event.target.value);
    if(event.target.value.length > 0)
      this.getStreamByLikeName(event.target.value);
    else
      this.searchStream = null;
  }

  private getLiveStream(): void {
    this.streamingServiceInstance
      .getLiveStreaming()
      .subscribe(
        data => this.liveStream = data,
        error => console.log(error),
        () => {console.log('get live stream complete', this.liveStream)}
      );
  }

  private getStreamByLikeName(twitchUser: string): any {
    this.streamingServiceInstance
      .getStreamingByLikeName(twitchUser)
      .subscribe(
        data => this.searchStream = data,
        error => console.log(error),
        () => {console.log('get stream complete', this.searchStream)}
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
}
