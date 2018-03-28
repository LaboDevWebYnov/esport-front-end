import { Component, OnInit } from '@angular/core';
import {NewsService} from "../../../../shared/services/news.service";
import {Configuration} from "../../../../shared/app.constants";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [Configuration,NewsService]

})
export class NewsComponent implements OnInit {
  private news: Object;
  private searchedNews: Object;
  public isFilteredGameId: any;


  constructor(private newsServiceInstance: NewsService,private route: ActivatedRoute,
              private router: Router,
  ) {


  }

  ngOnInit() {

    //this.getNews();

this.getNews();

  }


  public checkFilter(gameIdFiltered: string)
  {
    this.isFilteredGameId = gameIdFiltered;
  }
  private onSubmit(event) :void {

    console.log(event.target[0].value.length);
    console.log(this.news);
      this.newsServiceInstance
        .GetNewsByLikeName(event.target[0].value)
        .subscribe(
          data => this.searchedNews = data,
          error => console.log(error),
          () => {
            console.log('get all searched news complete', this.searchedNews);

          }
        );




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
  private getNewsSearch(query: string): void {
    this.newsServiceInstance
      .GetNewsByLikeName(query)
      .subscribe(
        data => this.news = data,
        error => console.log(error),
        () => {
          console.log('get all searched news complete', this.news);

        }
      );
  }


}
