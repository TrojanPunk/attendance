import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyExistsComponent } from './already-exists.component';

describe('AlreadyExistsComponent', () => {
  let component: AlreadyExistsComponent;
  let fixture: ComponentFixture<AlreadyExistsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlreadyExistsComponent]
    });
    fixture = TestBed.createComponent(AlreadyExistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
