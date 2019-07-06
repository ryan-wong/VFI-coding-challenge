import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/content/content.service';

let mockRouter = {
    navigate: jasmine.createSpy('navigate')
};

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
                        ra: 'token2',
                        uid: 'uid2'
                    });
                });
            },
            signInWithEmailAndPassword: (e, p) => {
                return new Promise((resolve, reject) => {
                    return resolve({
                        ra: 'token3',
                        uid: 'uid3'
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

describe('RoginComponent', () => {
    let component: LogoutComponent;
    let fixture: ComponentFixture<LogoutComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ LogoutComponent ],
            imports: [
                RouterTestingModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserModule
            ],
            providers: [
                { provide: FirebaseService, useClass: MockFirebaseService },
                { provide: Router, useValue: mockRouter },
                AuthService
            ]
        });

        fixture = TestBed.createComponent(LogoutComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
