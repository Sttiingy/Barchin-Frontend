import { Injectable } from "@angular/core";
import { FirebaseService } from "./firebase.service";
import { BehaviorSubject, distinctUntilChanged, filter, map, ReplaySubject, switchMap, takeUntil } from "rxjs";
import { AuthService } from "./auth.service";
import { doc as docSnapshots} from 'rxfire/firestore'
import { doc } from "firebase/firestore";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    public user$: ReplaySubject<any> = new ReplaySubject(1);
    public userBehaviour$: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(
        public firebaseService: FirebaseService,
        public authService: AuthService
    ) {
        this.authService.getAuthenticationState().pipe(
            distinctUntilChanged(),
            filter(isAuth => isAuth)
          ).subscribe(() => this.init());
    }

    init() {
        this.user$.next(null);
        this.userBehaviour$.next(null);
        this.loadUser();
    }

    loadUser() {
        console.log("LOAD USER");
        this.authService.getAuthenticationState().pipe(
            distinctUntilChanged(),
            filter(isAuth => isAuth),
            switchMap(() => this.authService.getUser()),
            filter((user: any) => user),
            switchMap((user) => docSnapshots(doc(this.firebaseService.firestore, `users/${user.uid}`))
            ),
            map((snap) => ({ id: snap.id, ...snap.data() })),
            takeUntil(this.authService.onSignOut$)
          ).subscribe((user: any) => {
            this.userBehaviour$.next(user);
            this.user$.next(user);
            console.log("LOGGED USER =>", user);
            if (user && user.validation && user.validation.disabled === true) {
              this.authService.logout();
            }
          });
    }

    public getUser() {
        return this.userBehaviour$.getValue();
    }

}