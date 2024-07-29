import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClickspharmacyPage } from './clickspharmacy.page';

describe('ClickspharmacyPage', () => {
  let component: ClickspharmacyPage;
  let fixture: ComponentFixture<ClickspharmacyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickspharmacyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
