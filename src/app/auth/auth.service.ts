import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FirebaseService } from '../shared/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  uid: string;
  subject = new Subject<any>();

  constructor(private firebaseService: FirebaseService) {
    this.uid = null;
    this.token = null;
    this.firebaseService.init();
    this.authChanged();
  }

  authChanged () {
    this.firebaseService.getInstance().onAuthStateChanged((user: any) => {
      if (user) {
        this.token = user.ra;
        this.uid = user.uid;
        localStorage.setItem('token', this.token);
        localStorage.setItem('uid', user.uid);
      }
      this.subject.next({});
    });
  }

  register(email: string, password: string) {
    return this.firebaseService.getInstance().createUserWithEmailAndPassword(email, password).then((response: any) => {
      this.token = response.ra;
      this.uid = response.user.uid;
      localStorage.setItem('token', this.token);
      localStorage.setItem('uid', this.uid);
      return response;
    }).catch(error => {
        throw error.message;
    });
  }

  login(email: string, password: string) {
    return this.firebaseService.getInstance().signInWithEmailAndPassword(email, password).then( (response: any) => {
      this.token = response.user.ra;
      this.uid = response.user.uid;
      localStorage.setItem('token', this.token);
      localStorage.setItem('uid', this.uid);
      return response;
    }).catch(error => {
        throw error.message;
    });
  }

  reset(password: string) {
    return this.firebaseService.getInstance().currentUser.updatePassword(password).then( (response: any) => {
      return true;
    }).catch(error => {
        throw error.message;
    });
  }

  logout() {
    this.firebaseService.getInstance().signOut();
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
