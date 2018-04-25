import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedConnectedComponent } from './feed-connected.component';

describe('FeedConnectedComponent', () => {
  let component: FeedConnectedComponent;
  let fixture: ComponentFixture<FeedConnectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedConnectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
