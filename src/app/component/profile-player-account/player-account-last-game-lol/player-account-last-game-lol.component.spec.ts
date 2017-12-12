import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerAccountLastGameLolComponent } from './player-account-last-game-lol.component';

describe('PlayerAccountLastGameLolComponent', () => {
  let component: PlayerAccountLastGameLolComponent;
  let fixture: ComponentFixture<PlayerAccountLastGameLolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerAccountLastGameLolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerAccountLastGameLolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
