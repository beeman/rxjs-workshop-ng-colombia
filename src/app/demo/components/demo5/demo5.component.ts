import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-demo5',
  templateUrl: './demo5.component.html',
})
export class Demo5Component implements OnInit {

  public input1result: any = {
    value: '',
  };

  public input2result: any = {
    value: '',
    query: '',
  };

  public input3result: any = {
    query: '',
  };

  @ViewChild('input1') input1: ElementRef;
  @ViewChild('input2') input2: ElementRef;
  @ViewChild('input3') input3: ElementRef;

  private input1El: HTMLInputElement;
  private input2El: HTMLInputElement;
  private input3El: HTMLInputElement;

  private input1$: Observable<Event>;
  private input2$: Observable<Event>;
  private input3$: Observable<Event>;

  private input2$query: Observable<string>;
  private input3$query: Observable<string>;

  private debounceDelay = 300;

  constructor(private data: DataService) {
  }

  ngOnInit() {
    this.input1El = this.input1.nativeElement;
    this.input2El = this.input2.nativeElement;
    this.input3El = this.input3.nativeElement;

    this.input1$ = fromEvent(this.input1El, 'keyup');
    this.input2$ = fromEvent(this.input2El, 'keyup');
    this.input3$ = fromEvent(this.input3El, 'keyup');

    this.activity1();
    this.activity2();
    this.activity3();
  }

  /**
   * Activity 1
   *
   * Subscribe to input1 and update the value in input1result
   */
  activity1() {
    this.input1$
      .subscribe((event) => {
        this.input1result.value = this.input1El.value;
        console.log(event);
      });
  }

  /**
   * Activity 2
   *
   * - Subscribe to input1
   * - use map to return the value of element input1
   * - use tap to store the value in input1result
   * - Debounce for 300 ms
   * - Only emit unique values using distinctUntilChanged
   */
  activity2() {
    this.input2$query = this.input2$
      .pipe(
        // Use the map operator to return the value of the input into the stream
        // We ignore the event we get back as we are not interested in the keyboard interaction, but in the value of the input.
        map((event) => {
          this.input2result.value = this.input2El.value;
          return this.input2El.value;
        }),
        // Update the value after debouncing
        debounceTime(this.debounceDelay),
        // Only emit values that are changed
        distinctUntilChanged(),
      );

    this.input2$query
      .subscribe((query) => {
        console.log('Updating query to', query);
        this.input2result.query = query;
      });
  }


  /**
   * Activity 3
   *
   * - Handle the input like above
   * - use map to return the value of element input1
   * - use tap to store the value in input1result
   * - Debounce for 300 ms
   * - Only emit unique values using distinctUntilChanged
   *
   * TODO: Search should keep working after an error was triggered
   * TODO: Add caching
   */
  activity3() {
    this.input3$query = this.input3$
      .pipe(
        // Return the input value
        map(() => this.input3El.value),
        // Update the value after debouncing
        debounceTime(this.debounceDelay),
        // Only emit values that are changed
        distinctUntilChanged(),
      );

    this.input3$query
      .pipe(
        tap(query => {
          this.input3result.query = query;
        }),
        switchMap((query) => this.search(query))
      )
      .subscribe(
        (result) => {
          this.input3result.result = result;
        },
        error => {
          this.input3result.error = error;
          this.input3result.loading = false;
          this.input3result.result = null;
        }
      );
  }


  search(query) {
    console.log('search', query);
    this.input3result.loading = true;
    return this.data.getCountriesByName(query)
      .pipe(
        tap(() => this.input3result.loading = false),
      );
  }
}
