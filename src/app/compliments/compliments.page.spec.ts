import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComplimentsPage } from './compliments.page';

describe('ComplimentsPage', () => {
  let component: ComplimentsPage;
  let fixture: ComponentFixture<ComplimentsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplimentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
