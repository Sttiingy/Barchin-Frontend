import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MenuService } from 'src/app/services/menu.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  constructor(
    public menuService: MenuService,
    public navCtrl: NavController,
    public userService: UserService
  ) { }

  ngOnInit() {}

  navTo(route: string) {
    this.menuService.toggleMenu();
    this.navCtrl.navigateRoot(route);
  }

}
