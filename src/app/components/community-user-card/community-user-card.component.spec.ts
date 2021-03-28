import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityUserCardComponent } from './community-user-card.component';

describe('CommunityUserCardComponent', () => {
  let component: CommunityUserCardComponent;
  let fixture: ComponentFixture<CommunityUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityUserCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
