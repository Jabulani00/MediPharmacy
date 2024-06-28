import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BecomeADriverPage } from './become-a-driver.page';

describe('BecomeADriverPage', () => {
  let component: BecomeADriverPage;
  let fixture: ComponentFixture<BecomeADriverPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeADriverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
