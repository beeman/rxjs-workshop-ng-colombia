import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { info1, info2, info3, info4, intro } from './demo1.activities';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
})
export class Demo1Component implements OnDestroy, OnInit {
  // Store the info about the activities
  public readonly intro = intro;
  public readonly info1 = info1;
  public readonly info2 = info2;
  public readonly info3 = info3;
  public readonly info4 = info4;

  // Get a reference to the elements using their #tag
  @ViewChild('button1') button1ref: ElementRef;
  @ViewChild('button2') button2ref: ElementRef;

  // Store a reference to the actual nativeElement
  private button1: HTMLElement;
  private button2: HTMLElement;

  // Store the result of the activities
  public result1: any;
  public result2: any;
  public result3: any;

  // Observable of Events from button2
  public button2$: Observable<Event>;

  // Reference to the Subscription of the button2 Observable
  public activity2sub: Subscription;

  // Reference to the Subscription of the button2 Observable
  public activity3sub: Subscription;

  constructor() {
  }

  /**
   * The ngOnInit method runs on Component initialization.
   */
  ngOnInit() {
    // Assign the nativeElements.
    this.button1 = this.button1ref.nativeElement;
    this.button2 = this.button2ref.nativeElement;

    // Run the activities
    this.activity1();
    this.activity2();
    this.activity3();
  }

  /**
   * Activity 1
   */
  activity1() {
    console.log('', 'aa');
    this.button1.addEventListener('click', (event: MouseEvent) => {
        console.log('aa', event);
        this.result1 = {x: event.clientX, y: event.clientY};
      }
    );
  }

  /**
   * Activity 2
   */
  activity2() {
    this.button2$ = fromEvent(this.button2, 'click');
    this.activity2sub = this.button2$
      .subscribe(
        (event: MouseEvent) => {
          this.result2 = {x: event.clientX, y: event.clientY};
        },
      );
  }

  /**
   * Activity 3
   */
  activity3() {
    this.activity3sub = fromEvent(document, 'click')
      .subscribe(
        (res: MouseEvent) => {
          this.result3 = {x: res.clientX, y: res.clientY};
        }
      );
  }

  /**
   * Activity 4
   *
   * The ngOnDestroy method runs on Component tear down.
   *
   * It can be used to unsubscribe the observable to prevent memory leaks.
   */
  ngOnDestroy() {
    this.activity2sub.unsubscribe();
    this.activity3sub.unsubscribe();
  }

}
