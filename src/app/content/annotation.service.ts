import { Injectable } from '@angular/core';
import { SelectionRectangleInterface } from './selectionrectangle.interface';
import { AnnotationModel } from './annotation.model';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {

  constructor() { }

  createAnnotation (selectedText: string, comment: string,
    location : SelectionRectangleInterface) : AnnotationModel {
    return {
      text: selectedText.trim(),
      comment: comment,
      top: location.top + 137,
      left: location.left,
      width: location.width,
      height: location.height
    };
  }

  updateAnnotation (selectedText: string, comment: string,
    location : SelectionRectangleInterface) : AnnotationModel {
    return {
      text: selectedText.trim(),
      comment: comment,
      top: location.top,
      left: location.left,
      width: location.width,
      height: location.height
    };
  }

  styleTags (text: string, categories: string[]) : string {
    let styledText = text;
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      styledText = styledText.replace(new RegExp('@' + category, 'g'),
      '<span class="annotated-category">@' +
      category + '</span>');
    }
    return styledText;
  }
}
