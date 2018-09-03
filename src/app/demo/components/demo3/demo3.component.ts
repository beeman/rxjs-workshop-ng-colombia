import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-demo3',
  templateUrl: './demo3.component.html',
  styles: [`
    canvas {
      width: 100%;
      background: #333;
    }
  `]
})
export class Demo3Component implements OnInit {

  public description: string[] = [
    `In this demo we subscribe to the <code>mousemove</code>,  <code>mousedown</code> and  <code>mouseup</code> events.`,
    `Based on these events we draw a line with random colors onto a <code>canvas</code>.`
  ];

  // Get a reference to the elements using their #tag
  @ViewChild('canvas1') canvas1: ElementRef;

  // Store a reference to the actual nativeElement
  private cvs1El: HTMLCanvasElement;
  public cvs1Ctx: CanvasRenderingContext2D;

  // Canvas Observables
  private canvas1move$: Observable<Event>;
  private canvas1down$: Observable<Event>;
  private canvas1up$: Observable<Event>;

  //
  private infiniteX = Infinity;
  private infiniteY = Infinity;
  private colorHue = 0;

  initCanvas() {
    this.cvs1El = this.canvas1.nativeElement;
    this.cvs1Ctx = this.cvs1El.getContext('2d');

    this.cvs1Ctx.lineJoin = 'round';
    this.cvs1Ctx.lineCap = 'round';
    this.cvs1Ctx.lineWidth = 70;
  }

  paintCanvas({clientX, clientY}) {
    this.colorHue++;
    this.cvs1Ctx.strokeStyle = `hsl(${this.colorHue}, 100%, 60%)`;

    this.cvs1Ctx.beginPath();

    if (Math.abs(this.infiniteX - clientX) < 100 && Math.abs(this.infiniteY - clientY) < 100) {
      this.cvs1Ctx.moveTo(this.infiniteX, this.infiniteY);
    }
    this.cvs1Ctx.lineTo(clientX, clientY);
    this.cvs1Ctx.stroke();

    this.infiniteX = clientX;
    this.infiniteY = clientY;
  }

  ngOnInit() {
    // Initialize the canvas
    this.initCanvas();

    // Run the activities
    this.activity1();
    this.activity2();
  }

  /**
   * Activity 1
   *
   */
  activity1() {
    // Set up the fromEvent Observables
    this.canvas1move$ = fromEvent(this.cvs1El, 'mousemove');
    this.canvas1down$ = fromEvent(this.cvs1El, 'mousedown');
    this.canvas1up$ = fromEvent(this.cvs1El, 'mouseup');
  }

  /**
   * Activity 2
   *
   */
  activity2() {
    const paints$ = this.canvas1down$.pipe(
      mergeMap(() => this.canvas1move$.pipe(takeUntil(this.canvas1up$)))
    );

    paints$.subscribe((event: any) => {
      this.paintCanvas(event);
    });
  }

}
