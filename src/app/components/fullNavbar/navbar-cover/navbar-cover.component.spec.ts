import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCoverComponent } from './navbar-cover.component';

describe('NavbarCoverComponent', () => {
  let component: NavbarCoverComponent;
  let fixture: ComponentFixture<NavbarCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarCoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
