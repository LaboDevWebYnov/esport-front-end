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
    {
      joueur1 : "Florian",
      joueur2 : "Jean-Eude DeLarue",
    },

  ];

  public matchPass = [
    {
      joueur1 : "Sylvain",
      score1: "7",
      joueur2 : "Alexandre",
      score2 : "5"
    },
    {
      joueur1 : "Clément",
      score1 : "10",
      joueur2 : "Maxence",
      score2 : "0"
    },
    {
      joueur1 : "Jade",
      score1 : "2",
      joueur2 : "Gauthier",
      score2 : "1"
    },
    {
      joueur1 : "Florian",
      score1 : "6",
      joueur2 : "Jean-Eude DeLarue",
      score2 : "2"
    },
    {
      joueur1 : "Sylvain",
      score1 :"1",
      joueur2 : "Alexandre",
      score2 : "7",
    },
    {
      joueur1 : "Clément",
      score1 : "8",
      joueur2 : "Maxence",
      score2 : "3",
    },
    {
      joueur1 : "Jade",
      score1 : "3",
      joueur2 : "Gauthier",
      score2 : "5",
    },
    {
      joueur1 : "Florian",
      score1 : "4",
      joueur2 : "Jean-Eude DeLarue",
      score2 : "3",
    },
    {
      joueur1 : "Florian",
      score1 : "8",
      joueur2 : "Jean-Eude DeLarue",
      score2 : "2",
    },

  ];

  constructor() { }

  ngOnInit() {

  }
  /*ngAfterContentInit(){
    document.querySelector('.containerMatch').removeAttribute('_ngcontent-c8')
  }*/

}
