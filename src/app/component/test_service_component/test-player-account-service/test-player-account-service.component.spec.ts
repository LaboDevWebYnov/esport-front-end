/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestPlayerAccountServiceComponent } from './test-player-account-service.component';

describe('TestPlayerAccountServiceComponent', () => {
  let component: TestPlayerAccountServiceComponent;
  let fixture: ComponentFixture<TestPlayerAccountServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPlayerAccountServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPlayerAccountServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
