import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DischempharmacyPage } from './dischempharmacy.page';

describe('DischempharmacyPage', () => {
  let component: DischempharmacyPage;
  let fixture: ComponentFixture<DischempharmacyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DischempharmacyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
