/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Step2TeamComponent } from './step2-team.component';

describe('Step2TeamComponent', () => {
  let component: Step2TeamComponent;
  let fixture: ComponentFixture<Step2TeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step2TeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step2TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
