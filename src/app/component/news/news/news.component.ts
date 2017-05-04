import { Component, OnInit } from '@angular/core';
import {NewsService} from "../../../../shared/services/news.service";
import {Configuration} from "../../../../shared/app.constants";


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [Configuration,NewsService]

})
export class NewsComponent implements OnInit {
  private news: Object;
  public isFilteredGameId: any;
  private

  constructor(private newsServiceInstance: NewsService
  ) { }

  ngOnInit() {
    this.getNews();


  }




  public checkFilter(gameIdFiltered: string)
  {
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
