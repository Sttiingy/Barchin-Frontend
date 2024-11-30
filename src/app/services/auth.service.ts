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

    public isAuthenticated$: ReplaySubject<boolean> = new ReplaySubject(1);
    public onSignOut$: Subject<any> = new Subject();
    public firebaseAccessToken: string = null;

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
              this.isAuthenticated$.next(true);
            } else {
              this.isAuthenticated$.next(false);
            }
        });
    }

    async login(email: string, password: string) {
        await this.firebaseService.loginWithFirebase(email, password);
        this.isAuthenticated$.next(true);
        this.firebaseAccessToken = await (await this.firebaseService.auth.currentUser).getIdToken();
        console.log(this.firebaseAccessToken);
    }

    getAuthenticationState() {
        return this.isAuthenticated$;
    }

    getUser() {
        return user(this.firebaseService.auth);
    }

    public async logout() {
        let alert = await this.alertCtrl.create({
            message: "¿Quieres cerrar sesión?",
            mode: 'ios',
            buttons: [
              {
                text: "Cancelar",
                role: 'cancel',
              },
              {
                text: "Cerrar sesión",
                role: 'logout',
                handler: async () => {
                    await this.firebaseService.auth.signOut();
                    this.isAuthenticated$.next(false);
                    this.onSignOut$.next(true);
                    this.getAuthenticationState().pipe(
                    ).subscribe((isAuth: boolean) => {
                        if(!isAuth) this.navCtrl.navigateRoot('login');
                    });
                }
              }
            ]
          });
        await alert.present();
    }
}