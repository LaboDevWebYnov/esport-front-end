import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsGamesComponent } from './stats-games.component';

describe('StatsGamesComponent', () => {
  let component: StatsGamesComponent;
  let fixture: ComponentFixture<StatsGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
