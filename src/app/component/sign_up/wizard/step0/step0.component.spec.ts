/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Step0Component } from './step0.component';

describe('Step0Component', () => {
  let component: Step0Component;
  let fixture: ComponentFixture<Step0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
