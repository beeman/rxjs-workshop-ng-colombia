import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, map, skip, takeUntil, throttleTime } from 'rxjs/operators';
import { intro, info1, info2, info3, info4, info5, info6 } from './demo2.activities';

@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.component.html',
})
export class Demo2Component implements OnInit {
  // Store the info about the activities
  public readonly intro = intro;
  public readonly info1 = info1;
  public readonly info2 = info2;
  public readonly info3 = info3;
  public readonly info4 = info4;
  public readonly info5 = info5;
  public readonly info6 = info6;

  // Get a reference to the elements using their #tag
  @ViewChild('button1') button1ref: ElementRef;
  @ViewChild('button2') button2ref: ElementRef;
  @ViewChild('button3') button3ref: ElementRef;
  @ViewChild('button5') button5ref: ElementRef;
  @ViewChild('button4') button4ref: ElementRef;
  @ViewChild('button6') button6ref: ElementRef;

  // Store a reference to the actual nativeElement
  private button1: HTMLElement;
  private button2: HTMLElement;
  private button3: HTMLElement;
  private button4: HTMLElement;
  private button5: HTMLElement;
  private button6: HTMLElement;

  // Button Observables
  private button1$: Observable<Event>;
  private button2$: Observable<Event>;
  private button3$: Observable<Event>;
  private button5$: Observable<Event>;
  private button4$: Observable<Event>;
  private button6$: Observable<Event>;

  // The counters for each of the buttons
  public counters: any = {
    button1: 0,
    button2: 0,
    button3: 0,
    button5: 0,
    button4: 0,
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
  increaseCounter(button: string, inc: number = 1) {
    this.counters[button] = this.counters[button] + inc;
  }

  ngOnInit() {
    // Assign the nativeElements.
    this.button1 = this.button1ref.nativeElement;
    this.button2 = this.button2ref.nativeElement;
    this.button3 = this.button3ref.nativeElement;
    this.button5 = this.button5ref.nativeElement;
    this.button4 = this.button4ref.nativeElement;
    this.button6 = this.button6ref.nativeElement;

    // Set up the fromEvent Observables
    this.button1$ = fromEvent(this.button1, 'click');
    this.button2$ = fromEvent(this.button2, 'click');
    this.button3$ = fromEvent(this.button3, 'click');
    this.button4$ = fromEvent(this.button4, 'click');
    this.button5$ = fromEvent(this.button5, 'click');
    this.button6$ = fromEvent(this.button6, 'click');

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
   */
  activity1() {
    this.button1$.subscribe(
      () => this.increaseCounter('button1'),
    );
  }

  /**
   * Activity 2
   */
  activity2() {
    this.button2$
      .pipe(throttleTime(this.throttleDelay))
      .subscribe(
        () => this.increaseCounter('button2'),
      );
  }

  /**
   * Activity 3
   */
  activity3() {
    this.button3$
      .pipe(debounceTime(this.debounceDelay))
      .subscribe(
        () => this.increaseCounter('button3'),
      );
  }

  /**
   * Activity 4
   */
  activity4() {
    this.button4$
      .pipe(
        map(() => this.multiplyAmount)
      )
      .subscribe(
        (amount) => this.increaseCounter('button4', amount),
      );
  }

  /**
   * Activity 5
   */
  activity5() {
    this.button5$
      .pipe(
        skip(this.skipAmount)
      )
      .subscribe(
        () => this.increaseCounter('button5'),
      );

  }

  /**
   * Activity 6
   */
  activity6() {
    const button6stop = new Subject();

    this.button6$
      .pipe(
        takeUntil(button6stop),
      )
      .subscribe(
        () => {
          if (this.counters.button6 + 1 === this.takeUntilAmount) {
            button6stop.next();
          }
          this.increaseCounter('button6');
        }
      );
  }

}
