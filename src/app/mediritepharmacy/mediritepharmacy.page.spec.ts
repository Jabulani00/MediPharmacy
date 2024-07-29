import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediritepharmacyPage } from './mediritepharmacy.page';

describe('MediritepharmacyPage', () => {
  let component: MediritepharmacyPage;
  let fixture: ComponentFixture<MediritepharmacyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MediritepharmacyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
