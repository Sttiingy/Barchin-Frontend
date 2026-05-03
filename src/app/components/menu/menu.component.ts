import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  constructor(
    public menuService: MenuService,
    public navCtrl: NavController,
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {}

  navTo(route: string) {
    this.menuService.toggleMenu();
    this.navCtrl.navigateRoot(route);
  }

  showHomeElement() {
    return !this.router.url.includes('home');
  }
}
