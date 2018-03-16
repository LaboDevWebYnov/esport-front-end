import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3TournamentComponent } from './step3-tournament.component';

describe('Step3TournamentComponent', () => {
  let component: Step3TournamentComponent;
  let fixture: ComponentFixture<Step3TournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step3TournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step3TournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
