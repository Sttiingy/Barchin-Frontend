import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CofradesPage } from './cofrades.page';

describe('CofradesPage', () => {
  let component: CofradesPage;
  let fixture: ComponentFixture<CofradesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CofradesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
