/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StreamingsComponent } from './streamings.component';

describe('StreamingsComponent', () => {
  let component: StreamingsComponent;
  let fixture: ComponentFixture<StreamingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
