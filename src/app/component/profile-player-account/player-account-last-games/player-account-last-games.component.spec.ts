import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerAccountLastGamesComponent } from './player-account-last-games.component';

describe('PlayerAccountLastGamesComponent', () => {
  let component: PlayerAccountLastGamesComponent;
  let fixture: ComponentFixture<PlayerAccountLastGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerAccountLastGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerAccountLastGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
