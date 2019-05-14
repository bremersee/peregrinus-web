import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasecampRedirectComponent } from './basecamp-redirect.component';

describe('BasecampRedirectComponent', () => {
  let component: BasecampRedirectComponent;
  let fixture: ComponentFixture<BasecampRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasecampRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasecampRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
