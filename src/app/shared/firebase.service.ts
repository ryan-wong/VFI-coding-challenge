import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firebaseInstance;

  constructor() {
    this.firebaseInstance = firebase;
  }

  init () {
    this.firebaseInstance.initializeApp(environment.firebase);
  }

  getInstance () {
    return this.firebaseInstance.auth();
  }

  write (path: string, payload: any): Promise<any> {
    return this.firebaseInstance.database().ref(path).set(payload);
  }

  read (path : string) : Promise<any> {
    return this.firebaseInstance.database().ref(path).once('value');
  }
}
