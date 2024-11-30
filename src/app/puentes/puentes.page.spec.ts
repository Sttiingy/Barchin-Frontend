import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PuentesPage } from './puentes.page';

describe('PuentesPage', () => {
  let component: PuentesPage;
  let fixture: ComponentFixture<PuentesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PuentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
