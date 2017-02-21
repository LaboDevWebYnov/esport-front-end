/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Step1TeamComponent } from './step1-team.component';

describe('Step1TeamComponent', () => {
  let component: Step1TeamComponent;
  let fixture: ComponentFixture<Step1TeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step1TeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step1TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
