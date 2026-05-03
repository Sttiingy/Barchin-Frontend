import { Injectable } from "@angular/core";
import { FirebaseService } from "./firebase.service";
import { BehaviorSubject, distinctUntilChanged, filter, map, ReplaySubject, Subject, switchMap, take, takeUntil } from "rxjs";
import { getIdToken } from "firebase/auth";
import { user, idToken } from 'rxfire/auth';
import { doc as docSnapshots} from 'rxfire/firestore'
import { writeBatch } from "firebase/firestore";
import { AlertController, NavController } from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    public firebaseAccessToken: any = null;
    public isAuthenticated: boolean = false;
    public isAuthenticated$: ReplaySubject<boolean> = new ReplaySubject(1);
    public currentUser: any = null;

    constructor(
        public firebaseService: FirebaseService,
        public navCtrl: NavController,
        public alertCtrl: AlertController
    ) {
        this.init();
    }

    init() {
        user(this.firebaseService.auth).subscribe((user) => {
            if (user) {
              this.isAuthenticated = true;
              this.isAuthenticated$.next(true);
            } else {
            this.isAuthenticated = false;
                this.isAuthenticated$.next(false);
            }
        });
    }

    async login(email: string, password: string) {
        await this.firebaseService.loginWithFirebase(email, password);
        this.isAuthenticated = true;
        this.isAuthenticated$.next(true);
        this.firebaseAccessToken = await (await this.firebaseService.auth.currentUser).getIdToken();
        this.currentUser = await this.firebaseService.getAdminById(this.firebaseService.auth.currentUser.uid);
        console.log("@AUTH SERVICE - LOGIN SUCCESS", this.currentUser);
        return this.firebaseService.auth.currentUser.uid;
    }

    getAuthenticationState() {
        return this.isAuthenticated;
    }

    getUser() {
        return this.currentUser;
    }

    public async logout() {
        let alert = await this.alertCtrl.create({
            message: "¿Quieres cerrar sesión?",
            mode: 'ios',
            buttons: [
              {
                text: "Cancelar",
                role: 'cancel',
                cssClass: 'cancel-alert-button'
              },
              {
                text: "Cerrar sesión",
                role: 'logout',
                cssClass: 'confirm-alert-button',
                handler: async () => {
                    await this.firebaseService.auth.signOut();
                    this.isAuthenticated = false;
                    this.isAuthenticated$.next(false);
                    let isAuth = this.getAuthenticationState();
                    if (!isAuth) {
                        this.navCtrl.navigateRoot('login');
                    }
                }
              }
            ],
            cssClass: 'alert-custom'
          });
        await alert.present();
    }
}