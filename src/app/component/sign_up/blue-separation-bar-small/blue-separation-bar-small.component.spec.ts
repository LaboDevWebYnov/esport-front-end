/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BlueSeparationBarSmallComponent } from './blue-separation-bar-small.component';

describe('BlueSeparationBarSmallComponent', () => {
  let component: BlueSeparationBarSmallComponent;
  let fixture: ComponentFixture<BlueSeparationBarSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueSeparationBarSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueSeparationBarSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
