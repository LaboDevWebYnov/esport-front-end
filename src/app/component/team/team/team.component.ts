import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  display(id:string):void {
    if (document.getElementById(id).style.maxHeight=="0px")
    {
      document.getElementById(id).style.maxHeight="5000px";
    }
    else
    {
      document.getElementById(id).style.maxHeight="0px";
    }
  }

}
