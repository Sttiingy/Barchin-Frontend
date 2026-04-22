import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.page.html',
  styleUrls: ['./admin-detail.page.scss'],
})
export class AdminDetailPage implements OnInit {

  loading: any;
  admin: any;
  id: any;

  constructor(
    public navCtrl: NavController,
    public firebase: FirebaseService,
    public route: ActivatedRoute
  ) { }

  async ngOnInit() {
    try {
      this.loading = true;
      this.id = await this.route.snapshot.paramMap.get('id')!;
      this.admin = await this.firebase.getAdminById(this.id);
      console.log(this.admin);
      console.log("@DETAIL " + this.id);
      this.loading = false;
    } catch (e) {
      this.loading = false;
      console.error(e);
    }
  }

  navBack() {
    this.navCtrl.navigateRoot('admin');
  }

  editAdmin() {
    try {
      this.loading = true;
      this.navCtrl.navigateRoot('edit-admin/' + this.id);
      this.loading = false;
    } catch(e) {
      this.loading = false;
      console.error(e);
    }
  }

}
