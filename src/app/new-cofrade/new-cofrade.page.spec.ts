import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewCofradePage } from './new-cofrade.page';

describe('NewCofradePage', () => {
  let component: NewCofradePage;
  let fixture: ComponentFixture<NewCofradePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCofradePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
