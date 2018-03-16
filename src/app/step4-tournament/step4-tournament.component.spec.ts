import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step4TournamentComponent } from './step4-tournament.component';

describe('Step4TournamentComponent', () => {
  let component: Step4TournamentComponent;
  let fixture: ComponentFixture<Step4TournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step4TournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step4TournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
