import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCofradePage } from './edit-cofrade.page';

describe('EditCofradePage', () => {
  let component: EditCofradePage;
  let fixture: ComponentFixture<EditCofradePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCofradePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
