import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TermsAndconditionsPage } from './terms-andconditions.page';

describe('TermsAndconditionsPage', () => {
  let component: TermsAndconditionsPage;
  let fixture: ComponentFixture<TermsAndconditionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAndconditionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
