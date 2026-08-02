import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DownloadListsPage } from './download-lists.page';

describe('DownloadListsPage', () => {
  let component: DownloadListsPage;
  let fixture: ComponentFixture<DownloadListsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadListsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
