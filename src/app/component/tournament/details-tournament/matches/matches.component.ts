import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  public participants = [
    {
      'pseudo': 'Sylvain',
      'logo': 'https://scontent-cdg2-1.xx.fbcdn.net/v/t31.0-8/27747783_10211288362991946_4276690311607586880_o.jpg?oh=9c37198eb5b1f6ec80081dcdd9247021&oe=5B421620',
      'coutry': 'ro',
    },
    {
      'pseudo': 'Alexandre',
      'logo': 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/27458929_1614197955338076_731359547194116480_n.jpg?oh=7b3c4a3bd990870c9b35cb9fc1bccba9&oe=5B378E67',
      'coutry': 'al',
    },
    {
      'pseudo': 'Clément',
      'logo': '',
      'coutry': 'ca',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
