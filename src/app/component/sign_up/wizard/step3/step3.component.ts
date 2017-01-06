import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {
  private idParam:string;
  private token: string;
  private userGetById: Object;
  private games: Object;
  private selectedGame: string
  //form&http_query status
  status = null;
  submitted = false;
  public errorMessage: string;
  public infoMessage: string;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    //get the url path&query params
    this.idParam = this.route.snapshot.params['id'];
    this.status = this.route.snapshot.params['status'];
    this.token = this.route.snapshot.params['token'];
    this.selectedGame = this.route.snapshot.params['selectedGame'];
    console.log(this.idParam, this.token, this.status, this.selectedGame);
  }

}
