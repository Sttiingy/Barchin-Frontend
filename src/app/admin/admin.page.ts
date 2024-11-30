import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss', '../../assets/scss/shared/_tables.scss'],
})
export class AdminPage implements OnInit {

  allUsers;
  loading: boolean = false;

  constructor(
    public firebase: FirebaseService
  ) { }

 async ngOnInit() {
    await this.init();
  }

  async init() {
    this.loading = true;
    try {
      let res = await this.firebase.getAllUsers();
      this.allUsers = res.docs.map((doc) => {
        let user: any = { id: doc.id, ...doc.data() };
        return user;
      });
      this.loading = false;
    } catch(e) {
      console.error(e);
      this.loading = false;
    }
  }

}
