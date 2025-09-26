import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-cofrade',
  templateUrl: './edit-cofrade.page.html',
  styleUrls: ['./edit-cofrade.page.scss'],
})
export class EditCofradePage implements OnInit {

  constructor(
    public firebase: FirebaseService,
    public route: ActivatedRoute,
    public navCtrl: NavController
  ) { }

  public cofrade;
  public loading: boolean;
  public id;
  public formattedBirthdate;

  async ngOnInit() {
    try {
      this.loading = true;
      this.id = await this.route.snapshot.paramMap.get('id')!;
      this.cofrade = await this.firebase.getCofradeById(this.id);
      this.formattedBirthdate = this.formatDateToInput();
      this.loading = false;
    } catch (e) {
      this.loading = false;
      console.error(e);
    }
  }

  formatDateToInput() {
    const year = this.cofrade.birthdate.toDate().getFullYear();
    const month = String(this.cofrade.birthdate.toDate().getMonth() + 1).padStart(2, "0"); // months are 0-based
    const day = String(this.cofrade.birthdate.toDate().getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  buttonIsDisabled() {
    return this.cofrade.name?.length === 0 || this.cofrade.name?.length === null || this.cofrade.surname?.length === 0 || this.cofrade.surname?.length === null
    || this.cofrade.sex?.length === 0 || this.cofrade.sex?.length === null || this.formattedBirthdate?.length < 10 || this.formattedBirthdate === null || this.cofrade.sex?.length === null
    || this.cofrade.number === null || this.cofrade.number?.length === 0;
  }

  async saveCofrade() {
    try {
      this.loading = true;
      if(this.cofrade?.sex?.length === 0) this.cofrade.sex = null;
      if(this.cofrade?.cumpRole?.length === 0) this.cofrade.cumpRole = null;
      if(this.cofrade?.bajaReason?.length === 0) this.cofrade.bajaReason = null;
      const [year, month, day] = this.formattedBirthdate.split("-").map(Number);
      this.cofrade.birthdate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
      await this.firebase.updateCofradeById(this.id, this.cofrade);
      this.navCtrl.navigateRoot('cofrade-detail/' + this.id);
      this.loading = false;
    } catch(e) {
      this.loading = false;
      console.error(e);
    }
  }

}
