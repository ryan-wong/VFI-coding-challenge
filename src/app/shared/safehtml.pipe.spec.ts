import { TestBed, inject } from '@angular/core/testing';
import {SafeHtmlPipe} from './safehtml.pipe';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';

describe('SafeHTMLPipe', () => {
    beforeEach(() => {
        TestBed
          .configureTestingModule({
            imports: [
              BrowserModule
            ]
          });
      });
    let pipe: SafeHtmlPipe;

  it('should be created', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    pipe = new SafeHtmlPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  }));

  it('should be parsed', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    pipe = new SafeHtmlPipe(domSanitizer);
    expect(typeof pipe.transform('<p>a</p>')).toEqual('object');
  }));
});
