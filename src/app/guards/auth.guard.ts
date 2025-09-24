import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NavController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(
    public authService: AuthService, 
    public router: Router, 
    public plt: Platform,
    public navCtrl: NavController
) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.isAuthenticated$.pipe(
            filter(val => val !== null), // Filter out initial Behaviour subject value
            take(1), // Otherwise the Observable doesn't complete!
            map(isAuthenticated => {
                if (isAuthenticated) {
                return true;
                } else {   
                if(!this.plt.is('capacitor')) {
                    this.navCtrl.navigateRoot('login');
                    return false;
                }
                }
            })
        );
    }
}
