import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth-guard.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class MockAuthService {
    public token: string;

    constructor () {
        this.token = null;
    }

    isAuthenticated () {
        return  (typeof this.token) === "string" && this.token.length > 0;
    }
}

@Injectable()
export class MockActivatedRouteSnapshot extends ActivatedRouteSnapshot {
}

let mockSnapshot:any = jasmine.createSpyObj<RouterStateSnapshot>("RouterStateSnapshot", ['toString']);



let mockRouter = {
    navigate: jasmine.createSpy('navigate')
};
describe('AuthGuard', () => {
    let service: AuthGuard;
    let authService : AuthService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
            { provide: Router, useValue: mockRouter },
            { provide: AuthService, useClass: MockAuthService },
            AuthGuard
        ]
       });
       service = TestBed.get(AuthGuard);
       authService = TestBed.get(AuthService);
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate to false', () => {
    var mockRouteSnapshot = new MockActivatedRouteSnapshot();
    expect(service.canActivate(mockRouteSnapshot, mockSnapshot)).toEqual(false);
  });

  it('should authenticate to true', () => {
    var mockRouteSnapshot = new MockActivatedRouteSnapshot();
    authService.token = 'abc';
    expect(service.canActivate(mockRouteSnapshot, mockSnapshot)).toEqual(true);
  });
});
