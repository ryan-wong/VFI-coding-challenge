import { SelectionRectangleInterface } from './selectionrectangle.interface';

export interface TextSelectEventInterface {
	text: string;
	viewportRectangle: SelectionRectangleInterface | null;
	hostRectangle: SelectionRectangleInterface | null;
}