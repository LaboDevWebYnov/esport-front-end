/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestTeamServiceComponent } from './test-team-service.component';

describe('TestTeamServiceComponent', () => {
  let component: TestTeamServiceComponent;
  let fixture: ComponentFixture<TestTeamServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTeamServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTeamServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
