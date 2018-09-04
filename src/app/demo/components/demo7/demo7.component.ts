import { Component } from '@angular/core';
import { EMPTY, from, Observable, of, throwError } from 'rxjs';

@Component({
  selector: 'app-demo7',
  templateUrl: './demo7.component.html',
})
export class Demo7Component {

  public result1: any;
  public result2: any;
  public result3: any;
  public activity3Error: any;
  public activity3Complete: any;
  public result4: any;
  public activity4Error: any;
  public activity4Complete: any;

  public result5: any;
  public activity5Complete: any;

  solution1() {
    const result = {
      action: 'I am an of',
      date: Date.now(),
    };

    of(result)
      .subscribe(
        res => this.result1 = res,
      );
  }

  solution2() {
    const promise = Promise.resolve({action: 'I am a Promise', date: Date.now()});

    from(promise)
      .subscribe(
        res => this.result2 = res,
      );
  }

  solution3() {
    throwError('This is the error message')
      .subscribe(
        {
          next: (res) => this.result3 = res,
          error: (err) => this.activity3Error = err,
          complete: () => this.activity3Complete = 'completed',
        }
      );
  }

  solution4() {
    const customObservable = Observable.create(observer => {
      observer.next('Emitting value 1');
      observer.next('Emitting value 2');
      observer.next('Emitting value 3');
      observer.complete('Done Emitting Values');
    });

    customObservable
      .subscribe(
        (res) => this.result4 = res,
        (err) => this.activity4Error = err,
        () => this.activity4Complete = 'completed',
      );
  }


  solution5() {
    EMPTY
      .subscribe(
        {
          next: (res) => this.result5 = res,
          complete: () => this.activity5Complete = 'completed',
        }
      );
  }

}
