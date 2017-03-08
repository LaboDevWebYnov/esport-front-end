import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-step5-team',
  templateUrl: './step5-team.component.html',
  styleUrls: ['./step5-team.component.css']
})
export class Step5TeamComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onSubmit(event){
    this.router.navigate(['team']);
  }
  goMyTeam(){
    this.router.navigate(['team']);
  }

}
