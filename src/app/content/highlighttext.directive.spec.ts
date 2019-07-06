import { HighlighttextDirective } from './Highlighttext.directive';
import { ElementRef, NgZone, Injectable } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

@Injectable()
export class MockElementRef {
  nativeElement: {}
}

@Injectable()
export class MockNgZone extends NgZone {
  constructor() {
    super({ enableLongStackTrace: false });
  }
}

describe('HighlighttextDirective', () => {
    let directive : HighlighttextDirective;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
            ],
            providers: [
                {provide: ElementRef, useClass: MockElementRef},
            ]
        });

        let elementRef = new MockElementRef();
        let zone = new MockNgZone();
        directive = new HighlighttextDirective(elementRef, zone);
    });


    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });
});
