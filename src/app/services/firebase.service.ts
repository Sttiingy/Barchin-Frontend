import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth, indexedDBLocalPersistence, initializeAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Capacitor } from '@capacitor/core';
import { addDoc, collection, doc, Firestore, getDoc, getDocs, getFirestore, query, setDoc, orderBy, limit, startAt } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  public firebaseApp: any;
  public auth: any;
  public firestore: any;
  public storage: any;

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
    return await getDocs(query(collection(this.firestore, 'cofrades'), orderBy('customId', 'asc')));
  }

  async getCofradesByFilter(filter: any, searchTerm: any,) {
    console.log(filter, searchTerm);
    if(filter === "NOMBRE") {
      let allCofrades:any = await getDocs(query(collection(this.firestore, 'cofrades'), orderBy('customId', 'asc')));
      allCofrades = allCofrades.docs.map(doc => doc.data());

      const resultados = allCofrades.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log("@RESULTADOS", resultados);
      return resultados;

    // } else if(filter === "APELLIDO") {
    //   return await getDocs(query(collection(this.firestore, 'cofrades'), orderBy('surname'), startAt(searchTerm), limit(20)));
    // } else if(filter === "NUM") {
    //   return await getDocs(query(collection(this.firestore, 'cofrades'), orderBy('number'), startAt(searchTerm), limit(20)));
    // }
    }
  }

  async getCofradesByPage(page: any) {
    return await getDocs(query(collection(this.firestore, 'cofrades'), orderBy('customId', 'asc'), limit(20), startAt(page * 20 + 1)));
  }

  async createCofrade(newCofrade: any) {
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
  
  async updateCofradeById(id: any, cofrade: any) {
    return await setDoc(doc(this.firestore, 'cofrades', id), cofrade);
  }
}
