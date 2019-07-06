import { TestBed, inject } from '@angular/core/testing';

import { ContentService } from './content.service';
import { FirebaseService } from '../shared/firebase.service';
import { Injectable } from '@angular/core';

@Injectable()
export class MockFirebaseService extends FirebaseService {
  constructor() {
    super();
    this.firebaseInstance = {
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
}

describe('Content.Service', () => {
  let service: ContentService;
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
          { provide: FirebaseService, useClass: MockFirebaseService },
          ContentService
        ]
      });
      service = TestBed.get(ContentService);
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getInitialBlob should return string', () => {
    expect(typeof service.getInitialBlob()).toEqual('string');
  });

  it('process_content highlighted text', () => {
    var text = 'a b c';
    var annotation = [{
        left: 1,
        top: 1,
        text: 'b',
        comment: 'd',
        height: 1,
        width: 1
    }];
    expect(service.process_content(text, annotation)).toContain('<span class="annotated-highlighted-text">');
  });

  it('process_content no highlighted text', () => {
    var text = 'a e c';
    var annotation = [{
        left: 1,
        top: 1,
        text: 'b',
        comment: 'd',
        height: 1,
        width: 1
    }];
    expect(service.process_content(text, annotation).indexOf('<span class="annotated-highlighted-text">')).toEqual(-1);
  });

  it('getContent from firebase', async(done) => {
    service.getContent('abc').then((data) => {
      expect(data.text).toEqual('abccc');
      expect(data.annotation.length).toEqual(0);
      done();
    })
  });

  it('saveContent to firebase', async() => {
    var annotation = [{
      left: 1,
      top: 1,
      text: 'b',
      comment: 'd',
      height: 1,
      width: 1
    }];
    service.saveContent ('text', annotation, 'uid').then((data) => {
      expect(data).toEqual(true);
    })
  });
});
