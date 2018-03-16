import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2TournamentComponent } from './step2-tournament.component';

describe('Step2TournamentComponent', () => {
  let component: Step2TournamentComponent;
  let fixture: ComponentFixture<Step2TournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step2TournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step2TournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
