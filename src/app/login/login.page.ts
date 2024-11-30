import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { IonInput, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { distinctUntilChanged, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public username: string = null;
  public password: string = null;
  public loading: boolean = false;
  public credentialsError: boolean = false;
  public onDestroy$: Subject<void> = new Subject();

  constructor(
    public firebaseService: FirebaseService,
    public authService: AuthService,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  async login() {
    try {
      this.loading = true;
      this.username = this.username.trim();
      this.password = this.password.trim();
      await this.authService.login(this.username, this.password);
      this.authService.getAuthenticationState().pipe(
        takeUntil(this.onDestroy$)
      ).subscribe((isAuth: boolean) => {
        if(isAuth) {
          this.username = null;
          this.password = null;
          this.navCtrl.navigateRoot('home');
        }
      });
    } catch (e) {
      console.error(e?.message);
      if(e?.message?.includes('auth/invalid')) {
        this.credentialsError = true;
      }
      this.loading = false;
    }
    this.loading = false;
  }

  resetAuthError() {
    this.credentialsError = false;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

}
