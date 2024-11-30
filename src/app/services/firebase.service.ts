import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth, indexedDBLocalPersistence, initializeAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Capacitor } from '@capacitor/core';
import { collection, Firestore, getDocs, getFirestore, query } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  public firebaseApp;
  public auth;
  public firestore;
  public storage;
  
  constructor(
  ) {
    this.init();
  }

  async init() {
    // Set up Firebase
    console.log("@INITIALIZING FIREBASE")
    this.firebaseApp = initializeApp(environment.firebase);
    if (Capacitor.isNativePlatform()) {
      initializeAuth(this.firebaseApp, {
        persistence: [indexedDBLocalPersistence]
      });
    }

    this.auth = getAuth(this.firebaseApp);
    this.firestore = getFirestore(this.firebaseApp);
    this.storage = getStorage(this.firebaseApp);
  }

  async loginWithFirebase(username: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, username, password);
  }

  async getAllUsers() {
    return await getDocs(query(collection(this.firestore, 'users')));
  }



}
