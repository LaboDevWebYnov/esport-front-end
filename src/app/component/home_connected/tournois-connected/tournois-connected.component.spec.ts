import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournoisConnectedComponent } from './tournois-connected.component';

describe('TournoisConnectedComponent', () => {
  let component: TournoisConnectedComponent;
  let fixture: ComponentFixture<TournoisConnectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournoisConnectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournoisConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
