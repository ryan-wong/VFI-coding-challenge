import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentComponent } from './content.component';
import { CategoryService } from './category.service';
import { AnnotationService } from './annotation.service';
import { FirebaseService } from '../shared/firebase.service';
import { AuthService } from '../auth/auth.service';
import { ContentService } from './content.service';
import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MentionModule } from 'angular-mentions';
import { SafeHtmlPipe } from '../shared/safehtml.pipe';
import { FormsModule } from '@angular/forms';

@Injectable()
export class MockFirebaseService extends FirebaseService {
    firebaseInstance: any;
    constructor() {
        super();
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
describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
        declarations: [ ContentComponent, SafeHtmlPipe ],
        providers: [
            { provide: FirebaseService, useClass: MockFirebaseService },
            CategoryService,
            AnnotationService,
            ContentService,
            AuthService
        ],
        imports: [
        BrowserModule,
        AngularFontAwesomeModule,
        MentionModule,
        FormsModule
        ],
    });

    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    component.ngOnInit();


    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('preset settings', () => {
    expect(component.text).toEqual('');
    expect(component.displayText).toEqual('');
    expect(component.selectedText).toEqual('');
    expect(component.currentAnnotationString).toEqual('');
    expect(component.annotationEditMode).toEqual(false);
    expect(component.annotationViewMode).toEqual(false);
    expect(component.annotationStyle).toEqual({});
    expect(component.currentAnnotationString).toEqual('');
  });

  it('test renderRectangles valid', () => {
    component.renderRectangles({
        text: 'string',
        viewportRectangle: {
            left: 1,
            top: 1,
            width: 1,
            height: 1,
        },
        hostRectangle: {
            left: 1,
            top: 1,
            width: 1,
            height: 1,
        }
    });

    expect(component.hostRectangle.left).toEqual(1);
    expect(component.viewportRectangle.left).toEqual(1);
    expect(component.selectedText).toEqual('string');
    expect(component.annotatedText).toEqual('string');
  });

  it('test renderRectangles invalid', () => {
    component.renderRectangles({
        text: 'string',
        viewportRectangle: null,
        hostRectangle: null
    });

    expect(component.hostRectangle).toEqual(null);
    expect(component.viewportRectangle).toEqual(undefined);
    expect(component.selectedText).toEqual('');
  });

  it('test annotateSelection', () => {
    component.hostRectangle = {
        left: 1,
        top: 1,
        width: 1,
        height: 1,
    };
    component.annotateSelection();
    expect(component.annotationStyle.top).toEqual('151px');
    expect(component.annotationEditMode).toEqual(true);
    expect(component.annotationViewMode).toEqual(false);
  });

  it('test editAnnotation', () => {
    component.editAnnotation({
        left: 1,
        top: 1,
        text: 'string',
        comment: 'string',
        height: 1,
        width: 1
    });
    expect(component.annotationStyle.top).toEqual('1px');
    expect(component.currentAnnotationString).toEqual('string');
    expect(component.annotationEditMode).toEqual(true);
    expect(component.annotationViewMode).toEqual(false);
  });

  it('test resetAnnotationSettings', () => {
    component.resetAnnotationSettings();
    expect(component.annotationEditMode).toEqual(false);
    expect(component.annotationViewMode).toEqual(false);
    expect(component.hostRectangle).toEqual(null);
    expect(component.viewportRectangle).toEqual(null);
    expect(component.selectedText).toEqual("");
    expect(component.annotationStyle).toEqual({});
    expect(component.annotatedText).toEqual("");
    expect(component.currentAnnotationString).toEqual("");
    expect(component.currentViewAnnotationString).toEqual("");
    expect(component.currentViewAnnotation).toEqual(null);
    expect(component.annotationLocation).toEqual(null);
  });

  it('test viewAnnotation', () => {
    component.viewAnnotation({
        left: 1,
        top: 1,
        text: 'string',
        comment: 'string @classics',
        height: 1,
        width: 1
    });
    expect(component.annotationEditMode).toEqual(false);
    expect(component.annotationViewMode).toEqual(true);
    expect(component.annotationStyle.top).toEqual('1px');
    expect(component.currentViewAnnotation.top).toEqual(1);
    expect(component.currentViewAnnotationString).toContain('<span class="annotated-category">');
  });

  it('test annotateUpdated', () => {
    component.annotateUpdated({
        target: {
            value: "test"
        }
    });
    expect(component.currentAnnotationString).toEqual('test');
  });

  it('test drawAnnotation', () => {
    expect(component.drawAnnotation({
        left: 1,
        top: 1,
        text: 'string',
        comment: 'string',
        height: 1,
        width: 1
    })).toEqual({
        top: '1px'
    });
  });
});
