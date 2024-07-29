import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentsQUESTIONPage } from './payments-question.page';

describe('PaymentsQUESTIONPage', () => {
  let component: PaymentsQUESTIONPage;
  let fixture: ComponentFixture<PaymentsQUESTIONPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsQUESTIONPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
