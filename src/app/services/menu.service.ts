import { Injectable } from "@angular/core";
import { MenuController } from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})

export class MenuService {

    constructor(
        public menuCtrl: MenuController
    ) {
    }

    toggleMenu() {
        this.menuCtrl.toggle();
    }
}