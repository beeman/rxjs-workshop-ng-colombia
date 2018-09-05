import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { DataService } from '../../services/data.service';
import { activity1, lesson } from './demo4.activities';

@Component({
  selector: 'app-demo4',
  templateUrl: './demo4.component.html',
})
export class Demo4Component implements OnInit {
  public readonly lesson = lesson;
  public readonly activity1 = activity1;

  public result: any;
  public loading = false;

  constructor(private service: DataService) {}

  ngOnInit() {}

  /**
   * Solution for Activity 1
   */
  solution1() {
    this.result = null;
    this.loading = true;

    this.service
      .randomImage()
      .pipe(map(response => response['data']))
      .subscribe(data => {
        this.result = data;
        this.loading = false;
      });
  }
}
