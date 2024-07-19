import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicineshoppepharmacyPage } from './medicineshoppepharmacy.page';

describe('MedicineshoppepharmacyPage', () => {
  let component: MedicineshoppepharmacyPage;
  let fixture: ComponentFixture<MedicineshoppepharmacyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineshoppepharmacyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
