import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetComponent } from './reset.component';
import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FirebaseService } from 'src/app/shared/firebase.service';

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

describe('ResetComponent', () => {
    let component: ResetComponent;
    let fixture: ComponentFixture<ResetComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ ResetComponent ],
            imports: [
                RouterTestingModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserModule
            ],
            providers: [
                { provide: FirebaseService, useClass: MockFirebaseService },
                AuthService
            ]
        });

        fixture = TestBed.createComponent(ResetComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('form invalid when empty', () => {
        expect(component.resetForm.valid).toEqual(false);
    });

    it('password field validity', () => {
        let password = component.resetForm.controls['password'];
        expect(password.valid).toBeFalsy();
    });

    it('password field validity errors', () => {
        let errors = {};
        let password = component.resetForm.controls['password'];
        errors = password.errors || {};
        expect(errors['required']).toBeTruthy();
    });

    it('password field set validity', () => {
        let errors = {};
        let password = component.resetForm.controls['password'];
        password.setValue("123456");
        errors = password.errors || {};
        expect(errors['required']).toBeFalsy();
    });

    it('password field set fail minimum', () => {
        let errors = {};
        let password = component.resetForm.controls['password'];
        password.setValue("12345");
        errors = password.errors || {};
        expect(errors['minlength']).toBeTruthy();
    });

    it('submitting a form', async(done) => {
        expect(component.resetForm.valid).toBeFalsy();
        component.resetForm.controls['password'].setValue("123456789");
        expect(component.resetForm.valid).toBeTruthy();
        component.onReset();
        setTimeout(() => {
            expect(component.resetSuccess).toEqual(true);
            done();
        }, 500);
      });
});
