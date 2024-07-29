import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkpharmacyPage } from './linkpharmacy.page';

describe('LinkpharmacyPage', () => {
  let component: LinkpharmacyPage;
  let fixture: ComponentFixture<LinkpharmacyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkpharmacyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
