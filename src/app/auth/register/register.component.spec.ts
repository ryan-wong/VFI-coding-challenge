import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
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
export class MockContentService {
    getInitialBlob () {
        return 'a';
    }
    saveContent () {

    }
}

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

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ RegisterComponent ],
            imports: [
                RouterTestingModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserModule
            ],
            providers: [
                { provide: FirebaseService, useClass: MockFirebaseService },
                { provide: Router, useValue: mockRouter },
                { provide: ContentService, useClass: MockContentService },
                AuthService
            ]
        });

        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it('form invalid when empty', () => {
        expect(component.registerForm.valid).toEqual(false);
    });

    it('email field validity', () => {
        let email = component.registerForm.controls['email'];
        expect(email.valid).toBeFalsy();
    });

    it('email field validity errors', () => {
        let errors = {};
        let email = component.registerForm.controls['email'];
        errors = email.errors || {};
        expect(errors['required']).toBeTruthy();
    });

    it('email field set validity', () => {
        let errors = {};
        let email = component.registerForm.controls['email'];
        email.setValue("a@gmail.com");
        errors = email.errors || {};
        expect(errors['required']).toBeFalsy();
    });

    it('password field validity', () => {
        let password = component.registerForm.controls['password'];
        expect(password.valid).toBeFalsy();
    });

    it('password field validity errors', () => {
        let errors = {};
        let password = component.registerForm.controls['password'];
        errors = password.errors || {};
        expect(errors['required']).toBeTruthy();
    });

    it('password field set validity', () => {
        let errors = {};
        let password = component.registerForm.controls['password'];
        password.setValue("123456");
        errors = password.errors || {};
        expect(errors['required']).toBeFalsy();
    });

    it('password field set fail minimum', () => {
        let errors = {};
        let password = component.registerForm.controls['password'];
        password.setValue("12345");
        errors = password.errors || {};
        expect(errors['minlength']).toBeTruthy();
    });

    it('submitting a form', async(done) => {
        expect(component.registerForm.valid).toBeFalsy();
        component.registerForm.controls['email'].setValue("a@gmail.com");
        component.registerForm.controls['password'].setValue("123456789");
        expect(component.registerForm.valid).toBeTruthy();
        component.onRegister();
        setTimeout(() => {
            expect(component.loginSuccess).toEqual(true);
            done();
        }, 500);
      });
});
