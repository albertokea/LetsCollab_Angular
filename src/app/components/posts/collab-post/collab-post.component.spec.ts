import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabPostComponent } from './collab-post.component';

describe('CollabPostComponent', () => {
  let component: CollabPostComponent;
  let fixture: ComponentFixture<CollabPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollabPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollabPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
