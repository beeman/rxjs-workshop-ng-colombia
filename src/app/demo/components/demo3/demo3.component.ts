import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { CanvasComponent } from '../../../ui/components/canvas/canvas.component';

@Component({
  selector: 'app-demo3',
  templateUrl: './demo3.component.html',
})
export class Demo3Component implements AfterViewInit {
  @ViewChild('canvas') canvas: CanvasComponent;

  // Canvas Observables
  private move$: Observable<Event>;
  private down$: Observable<Event>;
  private up$: Observable<Event>;

  // We need to run the solutions in ngAfterViewInit to make sure the canvas is properly initialized.
  ngAfterViewInit() {
    this.solution1();
    this.solution2();
  }

  /**
   * Solution for Activity 1
   *
   */
  solution1() {
    this.move$ = fromEvent(this.canvas.element, 'mousemove');
    this.down$ = fromEvent(this.canvas.element, 'mousedown');
    this.up$ = fromEvent(this.canvas.element, 'mouseup');
  }

  /**
   * Solution for Activity 2
   *
   */
  solution2() {
    const paints$ = this.down$
      .pipe(
        switchMap(() => this.move$
          .pipe(takeUntil(this.up$)))
      );

    paints$.subscribe((event: MouseEvent) => this.canvas.paintCanvas(event));
  }
}
