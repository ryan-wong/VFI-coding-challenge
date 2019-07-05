import { Component, OnInit } from '@angular/core';
import { ContentService } from './content.service';
import { TextSelectEventInterface } from './textselectevent.interface';
import { SelectionRectangleInterface } from './selectionrectangle.interface';
import { CategoryService } from './category.service';
import { AnnotationService } from './annotation.service';
import { AnnotationModel } from './annotation.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  text: string;
  displayText: string;

  mentionConfig: any;
  annotationList: AnnotationModel[];
  selectedText: string;

  annotatedText: string;
  hostRectangle: SelectionRectangleInterface | null;
  viewportRectangle: SelectionRectangleInterface | null;
  annotationLocation: SelectionRectangleInterface | null;
  annotationStyle: any;
  currentAnnotationString: string;
  currentViewAnnotation: AnnotationModel;
  currentViewAnnotationString: string;

  annotationEditMode: boolean;
  annotationViewMode: boolean;

  constructor(private contentService: ContentService,
    private categoryService: CategoryService,
    private annotationService: AnnotationService,
    private authService: AuthService) {
    this.text = '';
    this.displayText = '';
    this.selectedText = '';
    this.currentAnnotationString = '';
  }

  ngOnInit() {
    this.annotationEditMode = false;
    this.annotationViewMode = false;
    this.annotationStyle = {};
    this.mentionConfig = {
      items: this.categoryService.getCategories(),
      triggerChar: "@"
    };
    this.currentAnnotationString = '';
    this.init();
  }

  init () {
    this.contentService.getContent(this.authService.getUserId()).then((data) => {
      this.text = data.text;
      this.annotationList = data.annotation;
      this.displayText = this.contentService.process_content(data.text,
        this.annotationList);
    });
  }

  renderRectangles( event: TextSelectEventInterface ) {
    // console.log(event.hostRectangle);
    // console.log(event.viewportRectangle);

		if ( event.hostRectangle ) {
			this.hostRectangle = event.hostRectangle;
			this.viewportRectangle = event.viewportRectangle;
      this.selectedText = event.text;
      this.annotatedText = event.text;
      this.annotationLocation = this.hostRectangle;
		} else {
			this.hostRectangle = null;
			this.selectedText = "";
		}
  }

	annotateSelection() {
    this.annotationEditMode = true;
    this.annotationViewMode = false;
    this.currentAnnotationString = "";
    this.annotationStyle.top = (this.hostRectangle.top +  150) + 'px';
  }

  editAnnotation(currentAnnotation: any) {
    this.resetAnnotationSettings();
    this.annotationEditMode = true;
    this.annotationStyle.top = currentAnnotation.top + 'px';
    this.annotationLocation = currentAnnotation;
    this.annotatedText = currentAnnotation.text;
    this.currentAnnotationString = currentAnnotation.comment;
  }

  saveAnnotation () {
    var newAnnotation = this.annotationService.createAnnotation(this.annotatedText,
      this.currentAnnotationString, this.annotationLocation);
    this.annotationList.push(newAnnotation);
    this.contentService.saveContent(this.text, this.annotationList, this.authService.getUserId());
    this.resetAnnotationSettings();
    alert('Annotation Saved');
    this.init();
  }

  annotateUpdated (event: any) {
    this.currentAnnotationString = event.target.value;
  }

  drawAnnotation (annotation: AnnotationModel) {
    return {
      top: annotation.top + 'px'
    }
  }

  removeAnnotation() {
      this.resetAnnotationSettings();
  }

  viewAnnotation (annotation: AnnotationModel) {
    this.resetAnnotationSettings();
    this.annotationStyle.top = annotation.top + 'px';
    this.annotationViewMode = true;
    this.currentViewAnnotationString = this.annotationService.styleTags(
      annotation.comment,
      this.categoryService.getCategories());
    this.currentViewAnnotation = annotation;
  }

  resetAnnotationSettings () {
    this.annotationEditMode = false;
    this.annotationViewMode = false;
    document.getSelection().removeAllRanges();
    this.hostRectangle = null;
    this.viewportRectangle = null;
    this.selectedText = "";
    this.annotationStyle = {};
    this.annotatedText = "";
    this.currentAnnotationString = "";
    this.currentViewAnnotationString = "";
    this.currentViewAnnotation = null;
    this.annotationLocation = null;
  }
}
