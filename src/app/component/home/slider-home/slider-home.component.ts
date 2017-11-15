import { Component, OnInit } from '@angular/core';
import {NewsService} from "../../../../shared/services/news.service";

@Component({
  selector: 'app-slider-home',
  templateUrl: './slider-home.component.html',
  styleUrls: ['./slider-home.component.css'],
  providers: [NewsService]
})
export class SliderHomeComponent implements OnInit {

  private news: Object;
  public isFilteredGameId: any;

  constructor(private newsServiceInstance: NewsService) { }

  ngOnInit() {
    this.getNews();


  }

  public checkFilter(gameIdFiltered: string) {
    this.isFilteredGameId = gameIdFiltered;
  }
  private getNews(): void {
    this.newsServiceInstance
      .GetAllNews()
      .subscribe(
        data => this.news = data,
        error => console.log(error),
        () => {
          console.log('get all news complete', this.news);

        }
      );
  }
}
