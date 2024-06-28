import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutMedDashPage } from './about-med-dash.page';

describe('AboutMedDashPage', () => {
  let component: AboutMedDashPage;
  let fixture: ComponentFixture<AboutMedDashPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMedDashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
