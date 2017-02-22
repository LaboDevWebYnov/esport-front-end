/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Step4TeamComponent } from './step4-team.component';

describe('Step4TeamComponent', () => {
  let component: Step4TeamComponent;
  let fixture: ComponentFixture<Step4TeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step4TeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step4TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
