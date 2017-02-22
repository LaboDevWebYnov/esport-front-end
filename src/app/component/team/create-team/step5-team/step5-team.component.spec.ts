/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Step5TeamComponent } from './step5-team.component';

describe('Step5TeamComponent', () => {
  let component: Step5TeamComponent;
  let fixture: ComponentFixture<Step5TeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step5TeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step5TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
