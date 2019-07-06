import { TestBed } from '@angular/core/testing';

import { FirebaseService } from './firebase.service';
import { async } from 'q';

describe('FirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseService = TestBed.get(FirebaseService);
    expect(service).toBeTruthy();
  });

  it('should write to firebase', async() => {
    const service: FirebaseService = TestBed.get(FirebaseService);
    service.firebaseInstance = {
      database : () => {
          return {
            ref: (path: string) => {
              return {
                set: (payload: any) => {
                  return Promise.resolve(true);
                }
              }
            }
          };
      }
    };
    service.write('/path', {}).then((data) => {
      expect(data).toEqual(true);
    });
  });

  it('should read to firebase', async() => {
    const service: FirebaseService = TestBed.get(FirebaseService);
    service.firebaseInstance = {
      database : () => {
        return {
          ref: (path: string) => {
            return {
              once: (value: string) => {
                return Promise.resolve(true);
              }
            }
          }
        };
      }
    };
    service.read('/path').then((data) => {
      expect(data).toEqual(true);
    });
  });
});
