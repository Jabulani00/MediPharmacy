import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderQUESTIONPage } from './order-question.page';

describe('OrderQUESTIONPage', () => {
  let component: OrderQUESTIONPage;
  let fixture: ComponentFixture<OrderQUESTIONPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderQUESTIONPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
