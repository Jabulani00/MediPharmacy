import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PharmacistdirectPage } from './pharmacistdirect.page';

describe('PharmacistdirectPage', () => {
  let component: PharmacistdirectPage;
  let fixture: ComponentFixture<PharmacistdirectPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistdirectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
