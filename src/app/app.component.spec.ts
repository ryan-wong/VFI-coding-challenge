import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MockAuthService {
  token: string;
  uid: string;
  subject: Subject<any>;

  authChanged () {
    this.token = 'abc';
    this.uid = 'jDZK9dw8hXZQhQwJa4cMbtYkxz73';
    localStorage.setItem('token', 'abc');
    localStorage.setItem('uid', 'jDZK9dw8hXZQhQwJa4cMbtYkxz73');
    this.subject.next({});
  }
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: AuthService, useClass: MockAuthService}
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should not be ready', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.ready).toEqual(false);
  });

  it('collapse not be ready', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.collapsed).toEqual(true);
  });

  it('collapse toggled', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.toggleCollapsed();
    expect(app.collapsed).toEqual(false);
  });

});
