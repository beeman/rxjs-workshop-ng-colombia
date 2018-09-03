import { Component } from '@angular/core';
import { EMPTY, from, Observable, of, throwError } from 'rxjs';

@Component({
  selector: 'app-demo7',
  templateUrl: './demo7.component.html',
})
export class Demo7Component {

  public activity1Result: any;
  public activity2Result: any;
  public activity3Result: any;
  public activity3Error: any;
  public activity3Complete: any;
  public activity4Result: any;
  public activity4Error: any;
  public activity4Complete: any;

  public activity5Result: any;
  public activity5Complete: any;

  activity1() {
    const result = {
      action: 'I am an of',
      date: Date.now(),
    };

    of(result)
      .subscribe(
        res => this.activity1Result = res,
      );
  }

  activity2() {
    const promise = Promise.resolve({action: 'I am a Promise', date: Date.now()});

    from(promise)
      .subscribe(
        res => this.activity2Result = res,
      );
  }

  activity3() {
    throwError('This is the error message')
      .subscribe(
        {
          next: (res) => this.activity3Result = res,
          error: (err) => this.activity3Error = err,
          complete: () => this.activity3Complete = 'completed',
        }
      );
  }

  activity4() {
    const customObservable = Observable.create(observer => {
      observer.next('Emitting value 1');
      observer.next('Emitting value 2');
      observer.next('Emitting value 3');
      observer.complete('Done Emitting Values');
    });

    customObservable
      .subscribe(
        (res) => this.activity4Result = res,
        (err) => this.activity4Error = err,
        () => this.activity4Complete = 'completed',
      );
  }


  activity5() {
    EMPTY
      .subscribe(
        {
          next: (res) => this.activity5Result = res,
          complete: () => this.activity5Complete = 'completed',
        }
      );
  }

}
