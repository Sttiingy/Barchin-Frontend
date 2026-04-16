import { Component, HostListener, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cofrade-detail',
  templateUrl: './cofrade-detail.page.html',
  styleUrls: ['./cofrade-detail.page.scss'],
})
export class CofradeDetailPage implements OnInit {

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Verificamos si es Ctrl (o Cmd en Mac) y la tecla 'n'
    if ((event.ctrlKey || event.metaKey) && event.key === 'i') {
      event.preventDefault(); // Evita que el navegador abra una ventana nueva
      this.navToNewCofrade();
    }
  }

  navToNewCofrade() {
    this.navCtrl.navigateRoot('new-cofrade');
  }

  constructor(
    public route: ActivatedRoute,
    public firebase: FirebaseService,
    public navCtrl: NavController
  ) { }

  public cofrade;
  public loading: boolean;
  public age: number;
  public id;

  async ngOnInit() {
    try {
      this.loading = true;
      this.id = await this.route.snapshot.paramMap.get('id')!;
      this.cofrade = await this.firebase.getCofradeById(this.id);
      console.log(this.cofrade);
      if(!this.cofradeIsDead()) {
        this.age = this.calculateAge(this.cofrade.birthdate.toDate());
      }
      console.log("@DETAIL " + this.id);
      this.loading = false;
    } catch (e) {
      this.loading = false;
      console.error(e);
    }
  }

  cofradeIsDead() {
    return this.cofrade?.bajaReason != null && this.cofrade?.bajaReason?.length > 0 && this.cofrade?.bajaReason === 'EXI';
  }

  calculateAge(birthdate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    
    // Check if the birthday has occurred yet this year
    const monthDiff = today.getMonth() - birthdate.getMonth();
    const dayDiff = today.getDate() - birthdate.getDate();
    
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }

  editCofrade() {
    try {
      this.loading = true;
      this.navCtrl.navigateRoot('edit-cofrade/' + this.id);
      this.loading = false;
    } catch(e) {
      this.loading = false;
      console.error(e);
    }
  }

  navBack() {
    this.navCtrl.navigateRoot('cofrades');
  }

}
