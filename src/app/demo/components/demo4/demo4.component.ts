import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'app-demo4',
  templateUrl: './demo4.component.html',
})
export class Demo4Component implements OnInit {
  public result: any;
  public loading = false;

  constructor(private service: DataService) {}

  ngOnInit() {}

  makeRequest() {
    this.result = null;
    this.loading = true;
    this.service.randomImage()
      .pipe(
        delay(500),
        map(result => result['data']),
      )
      .subscribe(res => {
        this.loading = false;
        this.result = res;
      });
  }

}
