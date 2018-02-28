import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTournamentComponent } from './select-tournament.component';

describe('SelectTournamentComponent', () => {
  let component: SelectTournamentComponent;
  let fixture: ComponentFixture<SelectTournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
