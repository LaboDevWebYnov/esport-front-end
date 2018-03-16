import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step5TournamentComponent } from './step5-tournament.component';

describe('Step5TournamentComponent', () => {
  let component: Step5TournamentComponent;
  let fixture: ComponentFixture<Step5TournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step5TournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step5TournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
