/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProfilePlayerAccountComponent } from './profile-player-account.component';
import {GameService} from "../../../shared/services/game.service";
import {Configuration} from "../../../shared/app.constants";
import {PlayerAccountService} from "../../../shared/services/player-account.service";

describe('ProfilePlayerAccountComponent', () => {
  let component: ProfilePlayerAccountComponent;
  let fixture: ComponentFixture<ProfilePlayerAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePlayerAccountComponent ],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePlayerAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
