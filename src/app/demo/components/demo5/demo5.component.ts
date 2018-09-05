import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

import { DataService } from '../../services/data.service';
import { activity1, activity2, activity3, lesson } from './demo5.activities';

@Component({
  selector: 'app-demo5',
  templateUrl: './demo5.component.html',
})
export class Demo5Component implements OnInit {
  @ViewChild('input1')
  input1ref: ElementRef;
  @ViewChild('input2')
  input2ref: ElementRef;
  @ViewChild('input3')
  input3ref: ElementRef;

  public readonly lesson = lesson;
  public readonly activity1 = activity1;
  public readonly activity2 = activity2;
  public readonly activity3 = activity3;

  public inputClass = 'form-control form-control-lg bg-secondary text-white';
  public inputPlaceholder = 'Enter your search query';

  private input1: HTMLInputElement;
  private input2: HTMLInputElement;
  private input3: HTMLInputElement;

  private input1$: Observable<Event>;
  private input2$: Observable<Event>;
  private input3$: Observable<Event>;

  private input2$query: Observable<string>;
  private input3$query: Observable<string>;

  private debounceDelay = 300;

  public result1: any = {
    value: '',
  };

  public result2: any = {
    value: '',
    query: '',
  };

  public result3: any = {
    query: '',
  };

  constructor(private data: DataService) {}

  /**
   * Method to handle the search query and setting the loading indicator
   */
  search3(query) {
    this.result3.loading = true;
    return this.data
      .getCountriesByName(query)
      .pipe(tap(() => (this.result3.loading = false)));
  }

  ngOnInit() {
    this.input1 = this.input1ref.nativeElement;
    this.input2 = this.input2ref.nativeElement;
    this.input3 = this.input3ref.nativeElement;

    this.input1$ = fromEvent(this.input1, 'keyup');
    this.input2$ = fromEvent(this.input2, 'keyup');
    this.input3$ = fromEvent(this.input3, 'keyup');

    this.solution1();
    this.solution2();
    this.solution3();
  }

  /**
   * Activity 1
   *
   * Subscribe to input1 and update the value in result1
   */
  solution1() {
    this.input1$.subscribe(event => {
      this.result1.value = this.input1.value;
      console.log(event);
    });
  }

  /**
   * Activity 2
   *
   * - Subscribe to input2
   * - use map to return the value of element input2
   * - use tap to store the value in result1
   * - Debounce for 300 ms
   * - Only emit unique values using distinctUntilChanged
   */
  solution2() {
    this.input2$query = this.input2$.pipe(
      // Use the map operator to return the value of the input into the stream
      // We ignore the event we get back as we are not interested in the keyboard interaction, but in the value of the input.
      map(event => {
        this.result2.value = this.input2.value;
        return this.input2.value;
      }),

      // Update the value after debouncing
      debounceTime(this.debounceDelay),

      // Only emit values that are changed
      distinctUntilChanged(),
    );

    this.input2$query.subscribe(query => {
      console.log('Updating query to', query);
      this.result2.query = query;
    });
  }

  /**
   * Activity 3
   *
   * - Handle the input like above
   * - use map to return the value of element input3
   * - use tap to store the value in result1
   * - Debounce for 300 ms
   * - Only emit unique values using distinctUntilChanged
   *
   * TODO: Search should keep working after an error was triggered
   * TODO: Add caching
   */
  solution3() {
    this.input3$query = this.input3$.pipe(
      // Return the input value
      map(() => this.input3.value),

      // Update the value after debouncing
      debounceTime(this.debounceDelay),

      // Only emit values that are changed
      distinctUntilChanged(),
    );

    this.input3$query
      .pipe(
        tap(query => (this.result3.query = query)),
        switchMap(query => this.search3(query)),
      )
      .subscribe(
        result => (this.result3.result = result),
        error => {
          this.result3.error = error;
          this.result3.loading = false;
          this.result3.result = null;
        },
      );
  }
}
