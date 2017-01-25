/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BlueSeparationBarComponent } from './blue-separation-bar.component';

describe('BlueSeparationBarComponent', () => {
  let component: BlueSeparationBarComponent;
  let fixture: ComponentFixture<BlueSeparationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueSeparationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueSeparationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
