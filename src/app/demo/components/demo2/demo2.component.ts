import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, map, skip, takeUntil, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.component.html',
  styles: []
})
export class Demo2Component implements OnInit {

  // Get a reference to the elements using their #tag
  @ViewChild('button1') button1: ElementRef;
  @ViewChild('button2') button2: ElementRef;
  @ViewChild('button3') button3: ElementRef;
  @ViewChild('button4') button4: ElementRef;
  @ViewChild('button5') button5: ElementRef;
  @ViewChild('button6') button6: ElementRef;

  // Store a reference to the actual nativeElement
  private btn1El: HTMLElement;
  private btn2El: HTMLElement;
  private btn3El: HTMLElement;
  private btn4El: HTMLElement;
  private btn5El: HTMLElement;
  private btn6El: HTMLElement;

  // Button Observables
  private button1$: Observable<Event>;
  private button2$: Observable<Event>;
  private button3$: Observable<Event>;
  private button4$: Observable<Event>;
  private button5$: Observable<Event>;
  private button6$: Observable<Event>;

  // The counters for each of the buttons
  public counters: any = {
    button1: 0,
    button2: 0,
    button3: 0,
    button4: 0,
    button5: 0,
    button6: 0,
  };

  // Debounce time in ms
  public debounceDelay = 500;

  // Throttle duration in ms
  public throttleDelay = 1000;

  // Maximum number of events
  public takeUntilAmount = 5;

  // Number of events to skip
  public skipAmount = 5;

  // Click multiplier
  public multiplyAmount = 3;

  // Increase the button counter by a given number
  increaseCounter(button: string, inc: number) {
    this.counters[button] = this.counters[button] + inc;
  }

  ngOnInit() {
    // Assign the nativeElements.
    this.btn1El = this.button1.nativeElement;
    this.btn2El = this.button2.nativeElement;
    this.btn3El = this.button3.nativeElement;
    this.btn4El = this.button4.nativeElement;
    this.btn5El = this.button5.nativeElement;
    this.btn6El = this.button6.nativeElement;

    // Set up the fromEvent Observables
    this.button1$ = fromEvent(this.btn1El, 'click');
    this.button2$ = fromEvent(this.btn2El, 'click');
    this.button3$ = fromEvent(this.btn3El, 'click');
    this.button4$ = fromEvent(this.btn4El, 'click');
    this.button5$ = fromEvent(this.btn5El, 'click');
    this.button6$ = fromEvent(this.btn6El, 'click');

    // Run the activities
    this.activity1();
    this.activity2();
    this.activity3();
    this.activity4();
    this.activity5();
    this.activity6();
  }

  /**
   * Activity 1
   *
   * Subscribe to the button and update the counter
   *
   */
  activity1() {
    this.button1$.subscribe(
      () => this.increaseCounter('button1', 1),
    );
  }

  /**
   * Activity 2
   *
   * Use the throttleTime operator and set the duration to the throttleDelay
   *
   */
  activity2() {
    this.button2$
      .pipe(throttleTime(this.throttleDelay))
      .subscribe(
        () => this.increaseCounter('button2', 1),
      );
  }

  /**
   * Activity 3
   *
   * Use the debounceTime operator and set the due time to the debounceDelay
   *
   */
  activity3() {
    this.button3$
      .pipe(debounceTime(this.debounceDelay))
      .subscribe(
        () => this.increaseCounter('button3', 1),
      );
  }

  /**
   * Activity 4
   *
   * Use the takeUntil operator to limits the number of events that will be emitted.
   *
   */
  activity4() {
    const button4stop = new Subject();

    this.button4$
      .pipe(
        takeUntil(button4stop),
      )
      .subscribe(
        () => {
          if (this.counters.button4 + 1 === this.takeUntilAmount) {
            button4stop.next();
          }
          this.increaseCounter('button4', 1);
        }
      );
  }

  /**
   * Activity 5
   *
   * Use the skip operator to skip the first number of events
   */
  activity5() {
    this.button5$
      .pipe(
        skip(this.skipAmount)
      )
      .subscribe(
        () => this.increaseCounter('button5', 1),
      );

  }

  /**
   * Activity 6
   *
   * Use the map operator to modify the the result of the event
   */
  activity6() {
    this.button6$
      .pipe(
        map(() => this.multiplyAmount)
      )
      .subscribe(
        (amount) => this.increaseCounter('button6', amount),
      );
  }

}
