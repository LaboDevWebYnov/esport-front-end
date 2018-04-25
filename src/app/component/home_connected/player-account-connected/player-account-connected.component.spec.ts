import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerAccountConnectedComponent } from './player-account-connected.component';

describe('PlayerAccountConnectedComponent', () => {
  let component: PlayerAccountConnectedComponent;
  let fixture: ComponentFixture<PlayerAccountConnectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerAccountConnectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerAccountConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
