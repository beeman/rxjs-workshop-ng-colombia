import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-demo3',
  templateUrl: './demo3.component.html',
  styles: [`
    canvas {
      width: 100%;
      height: 500px;
      background: #333;
    }
  `],
})
export class Demo3Component implements OnInit {

  public description: string[] = [
    `In this demo we subscribe to the <code>mousemove</code>,  <code>mousedown</code> and  <code>mouseup</code> events.`,
    `Based on these events we draw a line with random colors onto a <code>canvas</code>.`
  ];

  @ViewChild('canvas1') canvas1: ElementRef;

  // Store a reference to the actual nativeElement
  private cvs1El: HTMLCanvasElement;
  public cvs1Ctx: CanvasRenderingContext2D;

  // Canvas Observables
  private canvas1move$: Observable<Event>;
  private canvas1down$: Observable<Event>;
  private canvas1up$: Observable<Event>;

  // Mouse positions
  public infiniteX = 0;
  public infiniteY = 0;
  private colorHue = 0;

  initCanvas() {
    this.cvs1El = this.canvas1.nativeElement;

    this.cvs1El.width = this.cvs1El.clientWidth;
    this.cvs1El.height = this.cvs1El.clientHeight;
    this.cvs1Ctx = this.cvs1El.getContext('2d');

    this.cvs1Ctx.lineJoin = 'round';
    this.cvs1Ctx.lineCap = 'round';
    this.cvs1Ctx.lineWidth = 70;
  }

  paintCanvas({ layerX, layerY }: MouseEvent) {
    this.colorHue++;
    this.cvs1Ctx.strokeStyle = `hsl(${this.colorHue}, 100%, 60%)`;

    this.cvs1Ctx.beginPath();

    this.cvs1Ctx.lineTo(layerX, layerY);
    this.cvs1Ctx.stroke();

    this.infiniteX = layerX;
    this.infiniteY = layerY;
  }


  ngOnInit() {
    // Initialize the canvas
    this.initCanvas();

    // Run the activities
    this.solution1();
    this.solution2();
  }

  /**
   * Activity 1
   *
   */
  solution1() {
    // Set up the fromEvent Observables
    this.canvas1move$ = fromEvent(this.cvs1El, 'mousemove');
    this.canvas1down$ = fromEvent(this.cvs1El, 'mousedown');
    this.canvas1up$ = fromEvent(this.cvs1El, 'mouseup');
  }

  /**
   * Activity 2
   *
   */
  solution2() {
    const paints$ = this.canvas1down$.pipe(switchMap(() => this.canvas1move$.pipe(takeUntil(this.canvas1up$))));

    paints$.subscribe((event: MouseEvent) => {
      this.paintCanvas(event);
    });
  }
}
