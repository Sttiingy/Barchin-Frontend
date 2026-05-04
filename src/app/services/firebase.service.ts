import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, indexedDBLocalPersistence, initializeAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Capacitor } from '@capacitor/core';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, orderBy, limit, startAt, writeBatch, getCountFromServer } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
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

  async getCofradesLength() {
    const snapshot = await getCountFromServer(collection(this.firestore, 'cofrades'));
    return snapshot.data().count;
  }

  async getCofradesByFilter(filter: any, searchTerm: any,) {
    console.log(filter, searchTerm);
    if(filter === "NOMBRE") {
      let allCofrades:any = await getDocs(query(collection(this.firestore, 'cofrades'), orderBy('customId', 'asc')));
      console.log("@BUSCANDO POR NOMBRE", allCofrades);
      allCofrades = allCofrades.docs.map((doc: any) => {
        let cofrade: any = { id: doc.id, ...doc.data() };
        return cofrade;
      });

      const resultados = allCofrades.filter((c: any) => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log("@RESULTADOS", resultados);
      return resultados;
    }
    else if(filter === "APELLIDO") {
      let allCofrades:any = await getDocs(query(collection(this.firestore, 'cofrades'), orderBy('customId', 'asc')));
      allCofrades = allCofrades.docs.map((doc: any) => {
        let cofrade: any = { id: doc.id, ...doc.data() };
        return cofrade;
      });

      const resultados = allCofrades.filter((c: any) => 
        c.surname.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log("@RESULTADOS", resultados);
      return resultados;

    }
    else if(filter === "NUM") {
      let allCofrades:any = await getDocs(query(collection(this.firestore, 'cofrades'), orderBy('customId', 'asc')));
      allCofrades = allCofrades.docs.map((doc: any) => {
        let cofrade: any = { id: doc.id, ...doc.data() };
        return cofrade;
      });

      const resultados = allCofrades.filter((c: any) => 
        c.number.toString() === searchTerm.toString()
      );
      console.log("@RESULTADOS", resultados);
      return resultados;
    }
    return [];
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

  async getAdminById(id: string) {
    const docRef = doc(this.firestore, 'users', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }
  
  async updateCofradeById(id: any, cofrade: any) {
    console.log("@ACTUALIZANDO COFRADE", id, cofrade);
    return await setDoc(doc(this.firestore, 'cofrades', id), cofrade);
  }
  async duplicateCollection(source: any, target: any) {
    const sourceRef = collection(this.firestore, source);
    const snapshot = await getDocs(sourceRef);

    const batch = writeBatch(this.firestore);

    snapshot.forEach((document) => {
      const targetDocRef = doc(
        this.firestore,
        `${target}/${document.id}`
      );

      batch.set(targetDocRef, document.data());
    });

    await batch.commit();

    console.log(
      `Copied ${snapshot.size} docs from ${source} to ${target}`
    );
  }
}
