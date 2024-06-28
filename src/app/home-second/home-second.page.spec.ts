import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeSecondPage } from './home-second.page';

describe('HomeSecondPage', () => {
  let component: HomeSecondPage;
  let fixture: ComponentFixture<HomeSecondPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSecondPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
