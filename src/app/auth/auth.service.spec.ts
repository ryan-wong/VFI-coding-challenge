import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { FirebaseService } from '../shared/firebase.service';
import { Injectable } from '@angular/core';

@Injectable()
export class MockFirebaseService {
    firebaseInstance: any;
    constructor() {
        this.firebaseInstance = {
            currentUser : {
                updatePassword: (p) => {
                    return new Promise((resolve, reject) => {
                        return resolve({});
                    });
                }
            },
            signOut: () => {},
            onAuthStateChanged: (cb) => {
                cb({
                    ra: 'token',
                    uid: 'uid'
                });
            },
            createUserWithEmailAndPassword: (e, p) => {
                return new Promise((resolve, reject) => {
                    return resolve({
                        user: {
                            ra: 'token2',
                            uid: 'uid2'
                        }
                    });
                });
            },
            signInWithEmailAndPassword: (e, p) => {
                return new Promise((resolve, reject) => {
                    return resolve({
                        user: {
                            ra: 'token3',
                            uid: 'uid3'
                        }
                    });
                });
            },
            database : () => {
                return {
                ref: (path: string) => {
                    return {
                    set: (payload: any) => {
                        return Promise.resolve(true);
                    },
                    once: (value: string) => {
                        return Promise.resolve({
                        val: () => {
                            return {
                            text: 'abccc',
                            annotation: []
                            };
                        }
                        });
                    }
                    }
                }
                };
            }
        };
    }

    init () {

    }

    getInstance () {
        return this.firebaseInstance;
    }

}

describe('AuthService', () => {
    let service : AuthService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: FirebaseService, useClass: MockFirebaseService },
                AuthService
            ]
        });
        service = TestBed.get(AuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('authChanged', async (done) => {
        service.authChanged();
        setTimeout(() => {
            expect(service.token).toEqual('token');
            expect(service.uid).toEqual('uid');
            done();
        }, 400);
    });

    it('register', async (done) => {
        service.register('email', 'password').then((data) => {
            expect(data.user.ra).toEqual('token2');
            expect(data.user.uid).toEqual('uid2');
            done();
        });
    });

    it('login', async (done) => {
        service.login('email', 'password').then((data) => {
            expect(data.user.ra).toEqual('token3');
            expect(data.user.uid).toEqual('uid3');
            done();
        });
    });

    it('reset', async (done) => {
        service.reset('password').then((data) => {
            expect(data).toEqual(true);
            done();
        });
    });

    it('getToken', () => {
        let token = service.getToken();
        expect(token).toEqual('token');
    });

    it('isAuthenticated', () => {
        let isAuthenticated = service.isAuthenticated();
        expect(isAuthenticated).toEqual(true);
    });

    it('getUserId', () => {
        let token = service.getUserId();
        expect(token).toEqual('uid');
    });

    it('logout', () => {
        service.logout();
        expect(service.token).toEqual(null);
    });

});
