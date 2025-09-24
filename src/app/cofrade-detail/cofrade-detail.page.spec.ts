import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CofradeDetailPage } from './cofrade-detail.page';

describe('CofradeDetailPage', () => {
  let component: CofradeDetailPage;
  let fixture: ComponentFixture<CofradeDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CofradeDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
