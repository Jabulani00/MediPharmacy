import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NetcarepharmacyPage } from './netcarepharmacy.page';

describe('NetcarepharmacyPage', () => {
  let component: NetcarepharmacyPage;
  let fixture: ComponentFixture<NetcarepharmacyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NetcarepharmacyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
