import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth, indexedDBLocalPersistence, initializeAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Capacitor } from '@capacitor/core';
import { addDoc, collection, doc, Firestore, getDoc, getDocs, getFirestore, query, setDoc } from 'firebase/firestore';
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
  async getAllCofrades() {
    return await getDocs(query(collection(this.firestore, 'cofrades')));
  }

  async createCofrade(newCofrade) {
    return await addDoc(collection(this.firestore, 'cofrades'), newCofrade)
  }

  async getCofradeById(id: string) {
    const docRef = doc(this.firestore, 'cofrades', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }
  
  async updateCofradeById(id, cofrade) {
    return await setDoc(doc(this.firestore, 'cofrades', id), cofrade);
  }
}
