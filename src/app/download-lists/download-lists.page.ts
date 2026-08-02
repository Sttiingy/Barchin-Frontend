import { Component, OnInit } from '@angular/core';
import { PdfService } from '../services/pdf.service';

@Component({
  selector: 'download-lists',
  templateUrl: './download-lists.page.html',
  styleUrls: ['./download-lists.page.scss'],
})
export class DownloadListsPage implements OnInit {

  constructor(
    public pdfService: PdfService
  ) { }

  public loading: boolean = false;

  ngOnInit() {
  }

  async testPdf(gender: string) {
    try {
      this.loading = true;
      await this.pdfService.generateCofradesPdf(gender);
      this.loading = false;
    } catch (error) {
      console.error("Error updating cofrades: ", error);
      this.loading = false;
    }
  }

}
