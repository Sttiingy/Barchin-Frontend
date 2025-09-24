import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-new-cofrade',
  templateUrl: './new-cofrade.page.html',
  styleUrls: ['./new-cofrade.page.scss'],
})
export class NewCofradePage implements OnInit {

  constructor(
    public firebaseService: FirebaseService,
    public navCtrl: NavController
  ) { }
  
  public newCofrade = {
    name: null,
    surname: null,
    number: null,
    sex: '',
    birthdate: null,
    cumpYear: null,
    cumpRole: '',
    damaYear: null,
    mayorYear: null,
    farolYear: null,
    info: null,
    phoneNumber: null,
    bajaYear: null,
    bajaReason: ''
  };

  public loading: boolean = false;

  public numToBeAssigned: number = null;
  
  async ngOnInit() {
    try {
      this.loading = true;
      let res = await this.firebaseService.getAllCofrades();
      let allCofrades = res.docs.map((doc) => {
        let cofrade: any = { id: doc.id, ...doc.data() };
        return cofrade;
      });
      this.numToBeAssigned = allCofrades?.length + 1;
      this.loading = false;
    } catch(e) {
      console.error(e);
      this.loading = false;
    }
  }

  buttonIsDisabled() {
    return this.newCofrade.name?.length === 0 || this.newCofrade.name?.length === null || this.newCofrade.surname?.length === 0 || this.newCofrade.surname?.length === null
    || this.newCofrade.sex?.length === 0 || this.newCofrade.sex?.length === null || this.newCofrade.birthdate?.length < 10 || this.newCofrade.birthdate === null || this.newCofrade.sex?.length === null
  }

  async createCofrade() {
    try {
      this.loading = true;
      if(this.newCofrade?.sex?.length === 0) this.newCofrade.sex = null;
      if(this.newCofrade?.cumpRole?.length === 0) this.newCofrade.cumpRole = null;
      if(this.newCofrade?.bajaReason?.length === 0) this.newCofrade.bajaReason = null;
      const [year, month, day] = this.newCofrade.birthdate.split("-").map(Number);
      this.newCofrade.birthdate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
      if(this.newCofrade?.number?.length === 0 || this.newCofrade?.number === null) this.newCofrade.number = this.numToBeAssigned;
      let res = await this.firebaseService.createCofrade(this.newCofrade);
      this.navCtrl.navigateRoot('cofrade-detail/' + res?.id);
      //TODO: Navegar al detall del cofrade creat 
      console.log(res?.id);
      this.loading = false;
    } catch(e) {
      this.loading = false;
      console.error(e);
    }
  }
}
