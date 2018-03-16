import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step1TournamentComponent } from './step1-tournament.component';

describe('Step1TournamentComponent', () => {
  let component: Step1TournamentComponent;
  let fixture: ComponentFixture<Step1TournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step1TournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step1TournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
