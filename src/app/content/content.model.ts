import { AnnotationModel } from './annotation.model';

export interface ContentModel {
	text: string;
	annotation: AnnotationModel[];
}