import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectpharmacyPage } from './selectpharmacy.page';

describe('SelectpharmacyPage', () => {
  let component: SelectpharmacyPage;
  let fixture: ComponentFixture<SelectpharmacyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectpharmacyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
