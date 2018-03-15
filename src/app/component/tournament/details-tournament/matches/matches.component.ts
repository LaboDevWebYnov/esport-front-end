import { Component, OnInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {


  public matchIncome = [
    {
      joueur1 : "Sylvain",
      joueur2 : "Alexandre",
    },
    {
      joueur1 : "Clément",
      joueur2 : "Maxence",
    },
    {
      joueur1 : "Jade",
      joueur2 : "Gauthier",
    },
    {
      joueur1 : "Florian",
      joueur2 : "Jean-Eude DeLarue",
    },

  ];

  constructor() { }

  ngOnInit() {

  }
  ngAfterContentInit(){
    document.querySelector('.containerMatch').removeAttribute('_ngcontent-c8')
  }

}
