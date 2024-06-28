import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DispatcherPage } from './dispatcher.page';

describe('DispatcherPage', () => {
  let component: DispatcherPage;
  let fixture: ComponentFixture<DispatcherPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatcherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
