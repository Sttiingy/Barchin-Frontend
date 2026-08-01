import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { PdfService } from '../services/pdf.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    public firebase: FirebaseService,
    public pdfService: PdfService
  ) { }

  ngOnInit() {
  }

  navTo(route: string) {
    this.navCtrl.navigateRoot(route);
  }

}
