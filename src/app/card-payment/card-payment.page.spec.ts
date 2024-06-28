import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardPaymentPage } from './card-payment.page';

describe('CardPaymentPage', () => {
  let component: CardPaymentPage;
  let fixture: ComponentFixture<CardPaymentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
