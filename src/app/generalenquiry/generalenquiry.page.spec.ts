import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneralenquiryPage } from './generalenquiry.page';

describe('GeneralenquiryPage', () => {
  let component: GeneralenquiryPage;
  let fixture: ComponentFixture<GeneralenquiryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralenquiryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
