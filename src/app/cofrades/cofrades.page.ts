import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cofrades',
  templateUrl: './cofrades.page.html',
  styleUrls: ['./cofrades.page.scss', '../../assets/scss/shared/_tables.scss'],
})
export class CofradesPage implements OnInit {

  loading: boolean = false;
  allCofrades: any;
  page: number = 0;
  canGoForward: boolean = true;

  constructor(
    public firebase: FirebaseService,
    public navCtrl: NavController
  ) { }

  async ngOnInit() {
    await this.init();
  }

  async init() {
    try {
      this.loading = true;
      let res = await this.firebase.getCofradesByPage(this.page);
      this.allCofrades = res.docs.map((doc) => {
        let cofrade: any = { id: doc.id, ...doc.data() };
        return cofrade;
      });
      if(this.allCofrades.length < 20) {
        this.canGoForward = false;
      } else {
        this.canGoForward = true;
      }
      console.log(new Date(this.allCofrades[0]?.fechaIni?.seconds * 1000));
      console.log("@COFRADES", this.allCofrades);
      this.loading = false;
    } catch (e) {
      this.loading = false;
      console.log(this.firebase.auth.currentUser);
      console.error(e);
    }
  }

  async navToCofradeDetail(id: any) {
    try {
      this.loading = true;
      console.log(id);
      this.navCtrl.navigateRoot('cofrade-detail/' + id);
      this.loading = false;
    } catch (e) {
      this.loading = false;
      console.error(e);
    }
  }

  incrementPage() {
    if(this.canGoForward) {
      this.page++;
      this.init();
    }
  }

  decrementPage() {
    if(this.page > 0) {
      this.page--;
      this.init();
    }
  }

}
