import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
})
export class Demo1Component implements OnDestroy, OnInit {
  // Get a reference to the elements using their #tag
  @ViewChild('button1') button1: ElementRef;
  @ViewChild('button2') button2: ElementRef;

  // Store a reference to the actual nativeElement
  private btn1El: HTMLElement;
  private btn2El: HTMLElement;

  // The message that will be displayed
  public message: string;

  public documentClickResult: any = {};

  // Observable of Events from button2
  public button2$: Observable<Event>;

  // Reference to the Subscription of the button2 Observable
  public button2Sub: Subscription;

  // Reference to the Subscription of the button2 Observable
  public documentClicksub: Subscription;

  // Log the event and update the message property
  handleClick(button: string, event: any) {
    console.log({event});
    this.message = `You clicked ${button}`;
  }

  /**
   * The ngOnInit method runs on Component initialization.
   */
  ngOnInit() {
    // Assign the nativeElements.
    this.btn1El = this.button1.nativeElement;
    this.btn2El = this.button2.nativeElement;

    // Run the activities
    this.activity1();
    this.activity2();
    this.activity3();
    this.activity4();
  }

  /**
   * Activity 1
   * Set up the addEventListener and log the event.
   */
  activity1() {
    this.btn1El.addEventListener('click', (event) => this.handleClick('button1', event));
  }

  /**
   * Activity 2
   * Set up the fromEvent Observable.
   */
  activity2() {
    this.button2$ = fromEvent(this.btn2El, 'click');
  }

  /**
   * Activity 3
   * Subscribe to the Observable log the event while storing a reference to the subscription.
   */
  activity3() {
    this.button2Sub = this.button2$
      .subscribe(
        (event) => this.handleClick('button2', event),
      );
  }

  /**
   * Activity 4
   *
   */
  activity4() {
    this.documentClicksub = fromEvent(document, 'click')
      .subscribe(
        (res: MouseEvent) => {
          console.log(res);
          this.documentClickResult = {
            clientX: res.clientX,
            clientY: res.clientY,
          };
        }
      );
  }

  /**
   * Activity 5
   *
   * The ngOnDestroy method runs on Component tear down.
   *
   * Unsubscribe the observable to prevent memory leaks.
   *
   */
  ngOnDestroy() {
    this.button2Sub.unsubscribe();
    this.documentClicksub.unsubscribe();
  }

}
