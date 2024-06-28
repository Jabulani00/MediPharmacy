import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PharmacyPage } from './pharmacy.page';

describe('PharmacyPage', () => {
  let component: PharmacyPage;
  let fixture: ComponentFixture<PharmacyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
