import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    public firebase: FirebaseService
  ) { }

  ngOnInit() {
  }

  navTo(route: string) {
    this.navCtrl.navigateRoot(route);
  }

  // async scriptToUPdate() {
  //   try {
  //     let res = await this.firebase.getAllCofrades();
  //     let list = res.docs.map((doc) => {
  //       let cofrade: any = { id: doc.id, ...doc.data() };
  //       return cofrade;
  //     });
  //     for(let cofrade of list) {
  //       // if(cofrade.customId > 357) {
  //       //   cofrade.customId = cofrade.customId + 11;
  //       //   await this.firebase.updateCofradeById(cofrade.id, cofrade);
  //       // }
  //       if(cofrade.customId > 379) {
  //         cofrade.customId = cofrade.customId - 1;
  //         await this.firebase.updateCofradeById(cofrade.id, cofrade);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error updating cofrades: ", error);
  //   }
  //   // try {
  //   //   await this.firebase.duplicateCollection('cofrades', 'cofrades_backup');
  //   // } catch (error) {
  //   //   console.error("Error duplicating collection: ", error);
  //   // }
  // }

}
