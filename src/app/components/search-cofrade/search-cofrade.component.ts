import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-cofrade',
  templateUrl: './search-cofrade.component.html',
  styleUrls: ['./search-cofrade.component.scss'],
})
export class SearchCofradeComponent  implements OnInit {

  filter:any = "NOMBRE";
  searchTerm: any = null;

  ngOnInit() {}

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    let data = {
      filter: this.filter,
      searchTerm: this.searchTerm
    }
    return this.modalCtrl.dismiss(data, 'confirm');
  }
}
