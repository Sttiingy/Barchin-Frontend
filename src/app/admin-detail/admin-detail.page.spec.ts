import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDetailPage } from './admin-detail.page';

describe('AdminDetailPage', () => {
  let component: AdminDetailPage;
  let fixture: ComponentFixture<AdminDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
