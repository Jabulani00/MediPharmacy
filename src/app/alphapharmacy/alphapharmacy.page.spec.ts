import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlphapharmacyPage } from './alphapharmacy.page';

describe('AlphapharmacyPage', () => {
  let component: AlphapharmacyPage;
  let fixture: ComponentFixture<AlphapharmacyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphapharmacyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
