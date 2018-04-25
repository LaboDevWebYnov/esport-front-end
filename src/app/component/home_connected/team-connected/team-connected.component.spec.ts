import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamConnectedComponent } from './team-connected.component';

describe('TeamConnectedComponent', () => {
  let component: TeamConnectedComponent;
  let fixture: ComponentFixture<TeamConnectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamConnectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
