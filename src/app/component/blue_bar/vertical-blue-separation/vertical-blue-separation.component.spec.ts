import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalBlueSeparationComponent } from './vertical-blue-separation.component';

describe('VerticalBlueSeparationComponent', () => {
  let component: VerticalBlueSeparationComponent;
  let fixture: ComponentFixture<VerticalBlueSeparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalBlueSeparationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalBlueSeparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
