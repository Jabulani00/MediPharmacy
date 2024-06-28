import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Covid19Page } from './covid-19.page';

describe('Covid19Page', () => {
  let component: Covid19Page;
  let fixture: ComponentFixture<Covid19Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Covid19Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
