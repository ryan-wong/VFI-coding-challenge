import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  uid: string;
  subject = new Subject<any>();

  constructor() {
    this.authChanged();
    this.uid = null;
  }

  authChanged () {
    firebase.initializeApp(environment.firebase);
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        this.token = user.ra;
        localStorage.setItem('token', this.token);
        localStorage.setItem('uid', user.uid);
        this.uid = user.uid;
      }
      this.subject.next({});
    });
  }

  register(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((response: any) => {
      this.token = response.ra;
      this.uid = response.uid;
      localStorage.setItem('token', this.token);
      localStorage.setItem('uid', response.user.uid);
      return response;
    }).catch(error => {
        throw error.message;
    });
  }

  login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password).then( (response: any) => {
      this.token = response.ra;
      this.uid = response.uid;
      console.log(response);
      console.log(response.uid);
      localStorage.setItem('token', this.token);
      localStorage.setItem('uid', response.uid);
      return response;
    }).catch(error => {
        throw error.message;
    });
  }

  reset(password: string) {
    return firebase.auth().currentUser.updatePassword(password).then( (response: any) => {
      return true;
    }).catch(error => {
        throw error.message;
    });
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
    localStorage.clear();
  }

  getToken () {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  getUserId () {
    if (!this.uid) {
      this.uid = localStorage.getItem('uid');
    }
    return this.uid;
  }

  isAuthenticated () {
    let token = this.getToken();
    return  (typeof token) === "string" && token.length > 0;
  }
}
