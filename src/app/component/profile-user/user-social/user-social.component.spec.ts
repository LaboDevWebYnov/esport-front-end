/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserSocialComponent } from './user-social.component';

describe('UserSocialComponent', () => {
  let component: UserSocialComponent;
  let fixture: ComponentFixture<UserSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
