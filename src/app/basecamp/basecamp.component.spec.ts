import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasecampComponent } from './basecamp.component';

describe('BasecampComponent', () => {
  let component: BasecampComponent;
  let fixture: ComponentFixture<BasecampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasecampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasecampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
