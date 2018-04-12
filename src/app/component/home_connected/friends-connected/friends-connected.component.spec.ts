import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsConnectedComponent } from './friends-connected.component';

describe('FriendsConnectedComponent', () => {
  let component: FriendsConnectedComponent;
  let fixture: ComponentFixture<FriendsConnectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsConnectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
