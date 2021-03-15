import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetscollabComponent } from './letscollab.component';

describe('LetscollabComponent', () => {
  let component: LetscollabComponent;
  let fixture: ComponentFixture<LetscollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetscollabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetscollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
