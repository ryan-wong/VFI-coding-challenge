import { TestBed } from '@angular/core/testing';

import { AnnotationService } from './annotation.service';
import { AnnotationModel } from './annotation.model';

describe('AnnotationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnnotationService = TestBed.get(AnnotationService);
    expect(service).toBeTruthy();
  });

  it('create annotation', () => {
    const service: AnnotationService = TestBed.get(AnnotationService);
    let location : AnnotationModel = {
        left: 1,
        top: 1,
        text: 'string',
        comment: 'b',
        height: 1,
        width: 1
    };
    let result = service.createAnnotation('string', 'b',location);
    expect(result.text).toEqual('string');
    expect(result.comment).toEqual('b');
    expect(result.top).toEqual(138);
    expect(result.left).toEqual(location.left);
    expect(result.width).toEqual(location.width);
    expect(result.height).toEqual(location.height);
  });
  it('style annotation tags valid', () => {
    const service: AnnotationService = TestBed.get(AnnotationService);
    let categories = ["a", "b"];
    let text = "@a @b c";
    let result = service.styleTags (text, categories);
    expect(result).toContain('<span class="annotated-category">');
  });
  it('style annotation tags at end', () => {
    const service: AnnotationService = TestBed.get(AnnotationService);
    let categories = ["a", "b"];
    let text = "a @b @a";
    let result = service.styleTags (text, categories);
    expect(result).toContain('<span class="annotated-category">');
  });
  it('style annotation multiple tags', () => {
    const service: AnnotationService = TestBed.get(AnnotationService);
    let categories = ["a", "b"];
    let text = "@a @b @a";
    let result = service.styleTags (text, categories);
    expect(result).toContain('<span class="annotated-category">');
  });
  it('style annotation tags no change', () => {
    const service: AnnotationService = TestBed.get(AnnotationService);
    let categories = ["a", "b"];
    let text = "a b c";
    let result = service.styleTags (text, categories);
    expect(result.indexOf('<span class="annotated-category">')).toEqual(-1);
  });
});
