import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cofrade-detail',
  templateUrl: './cofrade-detail.page.html',
  styleUrls: ['./cofrade-detail.page.scss'],
})
export class CofradeDetailPage implements OnInit {

  constructor(
    public route: ActivatedRoute,
    public firebase: FirebaseService
  ) { }

  public cofrade;
  public loading: boolean;

  async ngOnInit() {
    try {
      this.loading = true;
      let id = await this.route.snapshot.paramMap.get('id')!;
      this.cofrade = await this.firebase.getCofradeById(id);
      const date = this.cofrade.birthdate.toDate();
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");
      this.cofrade.birthdate = year + '-' + month + '-' + day;
      this.loading = false;
    } catch (e) {
      this.loading = false;
      console.error(e);
    }
  }

}
