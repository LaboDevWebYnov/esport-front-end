import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTournamentComponent } from './details-tournament.component';

describe('DetailsTournamentComponent', () => {
  let component: DetailsTournamentComponent;
  let fixture: ComponentFixture<DetailsTournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
