import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { ActionsPopoverComponent } from '../components/actions-popover/actions-popover.component';

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
    public route: ActivatedRoute,
    public popoverController: PopoverController
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

  async presentActionsPopover(e: Event) {
    const popover = await this.popoverController.create({
      component: ActionsPopoverComponent,
      mode: 'md',
      event: e,
    });

    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log(`Popover dismissed with role: ${role}`);
  }

}
