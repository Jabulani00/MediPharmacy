import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrescriptionModalPage } from './prescription-modal.page';

describe('PrescriptionModalPage', () => {
  let component: PrescriptionModalPage;
  let fixture: ComponentFixture<PrescriptionModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
