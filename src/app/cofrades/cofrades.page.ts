import { Component, HostListener, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ModalController, NavController } from '@ionic/angular';
import { SearchCofradeComponent } from '../components/search-cofrade/search-cofrade.component';

@Component({
  selector: 'app-cofrades',
  templateUrl: './cofrades.page.html',
  styleUrls: ['./cofrades.page.scss', '../../assets/scss/shared/_tables.scss'],
})
export class CofradesPage implements OnInit {

  loading: boolean = false;
  searchDone: boolean = false;
  allCofrades: any;
  totalCofrades: any;
  totalPages: any;
  page: number = 0;
  canGoForward: boolean = true;
  filter:any = "NOMBRE";
  searchTerm: any = null;

  @HostListener('window:keydown', ['$event'])
  async handleKeyboardEvent(event: KeyboardEvent) {
    // Verificamos si es Ctrl (o Cmd en Mac) y la tecla 'i'
    if (event.key === 'Enter' && this.searchTerm != null && this.searchTerm.length > 0) {
      event.preventDefault(); // opcional, según lo que quieras evitar
      await this.searchByFilter();
    }
  }

  constructor(
    public firebase: FirebaseService,
    public navCtrl: NavController,
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    await this.init();
  }

  async init() {
    try {
      this.loading = true;
      this.filter = "NOMBRE";
      this.searchTerm = null;
      this.searchDone = false;
      this.totalCofrades = await this.firebase.getCofradesLength();
      this.totalPages = Math.ceil(this.totalCofrades / 20);
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

  async openSearchModal() {
    const modal = await this.modalCtrl.create({
      component: SearchCofradeComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if(role === "confirm") {
      this.filter = data.filter;
      this.searchTerm = data.searchTerm;
      await this.searchByFilter();
    }
  }

  async navToCofradeDetail(id: any) {
    try {
      this.loading = true;
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

  async searchByFilter() {
    try {
      this.loading = true;
      this.allCofrades = await this.firebase.getCofradesByFilter(this.filter, this.searchTerm);
      console.log("@SEARCH RESULTS", this.allCofrades);
      this.searchDone = true;
      this.loading = false;
    } catch (e) {
      this.loading = false;
      console.error(e);
    }
  }

}
