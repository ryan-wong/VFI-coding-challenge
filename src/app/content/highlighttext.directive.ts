import { Directive, OnInit, OnDestroy, EventEmitter, ElementRef, NgZone } from '@angular/core';
import { TextSelectEventInterface } from './textselectevent.interface';
import { SelectionRectangleInterface } from './selectionrectangle.interface';

@Directive({
  selector: "[textSelect]",
	outputs: [ "textSelectEvent: textSelect" ]
})
export class HighlighttextDirective implements OnInit, OnDestroy {
  public textSelectEvent: EventEmitter<TextSelectEventInterface>;

	private elementRef: ElementRef;
	private hasSelection: boolean;
	private zone: NgZone;

	constructor(elementRef: ElementRef, zone: NgZone) {
		this.elementRef = elementRef;
		this.zone = zone;
		this.hasSelection = false;
		this.textSelectEvent = new EventEmitter();
	}

	public ngOnDestroy() : void {
		this.elementRef.nativeElement.removeEventListener( "mousedown",
		this.handleMousedown, false );
		document.removeEventListener( "mouseup", this.handleMouseup, false );
		document.removeEventListener( "selectionchange",
		this.handleSelectionChange, false );

	}

	public ngOnInit() : void {
		this.zone.runOutsideAngular(() => {
			this.elementRef.nativeElement.addEventListener( "mousedown",
			this.handleMousedown, false );
			document.addEventListener( "selectionchange",
			this.handleSelectionChange, false );
		});
	}

	private getRangeContainer( range: Range ) : Node {

		var container = range.commonAncestorContainer;

		while ( container.nodeType !== Node.ELEMENT_NODE ) {
			container = container.parentNode;
		}

		return( container );

	}

	private handleMousedown = () : void => {
		document.addEventListener( "mouseup", this.handleMouseup, false );
	}

	private handleMouseup = () : void => {
		document.removeEventListener( "mouseup", this.handleMouseup, false );
		this.processSelection();
	}

	private handleSelectionChange = () : void => {
		if ( this.hasSelection ) {
			this.processSelection();
		}
	}

	private processSelection() : void {

		var selection = document.getSelection();

		if ( this.hasSelection ) {
			this.zone.runGuarded(() => {
					this.hasSelection = false;
					this.textSelectEvent.next({
						text: "",
						viewportRectangle: null,
						hostRectangle: null
					});
			});
		}

		if ( ! selection.rangeCount || ! selection.toString() ) {
			return;
		}

		var range = selection.getRangeAt( 0 );
		var rangeContainer = this.getRangeContainer( range );

		if ( this.elementRef.nativeElement.contains( rangeContainer ) ) {

			var viewportRectangle = range.getBoundingClientRect();
			var localRectangle = this.viewportToHost( viewportRectangle,
				rangeContainer );

			this.zone.runGuarded(() => {
				this.hasSelection = true;
				this.textSelectEvent.emit({
					text: selection.toString(),
					viewportRectangle: {
						left: viewportRectangle.left,
						top: viewportRectangle.top,
						width: viewportRectangle.width,
						height: viewportRectangle.height
					},
					hostRectangle: {
						left: localRectangle.left,
						top: localRectangle.top,
						width: localRectangle.width,
						height: localRectangle.height
					}
				});
			});

		}

	}

	private viewportToHost(viewportRectangle: SelectionRectangleInterface,
		rangeContainer: Node) : SelectionRectangleInterface {

		var host = this.elementRef.nativeElement;
		var hostRectangle = host.getBoundingClientRect();

		var localLeft = ( viewportRectangle.left - hostRectangle.left );
		var localTop = ( viewportRectangle.top - hostRectangle.top );

		var node = rangeContainer;

		do {

			localLeft += ( <Element>node ).scrollLeft;
			localTop += ( <Element>node ).scrollTop;

		} while ( ( node !== host ) && ( node = node.parentNode ) );

		return({
			left: localLeft,
			top: localTop,
			width: viewportRectangle.width,
			height: viewportRectangle.height
		});

	}
}
