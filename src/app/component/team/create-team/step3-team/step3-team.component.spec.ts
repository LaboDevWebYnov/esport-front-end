/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Step3TeamComponent } from './step3-team.component';

describe('Step3TeamComponent', () => {
  let component: Step3TeamComponent;
  let fixture: ComponentFixture<Step3TeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step3TeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step3TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
