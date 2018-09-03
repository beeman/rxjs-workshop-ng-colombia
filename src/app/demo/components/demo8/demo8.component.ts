import { Component, OnInit } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';

@Component({
  selector: 'app-demo8',
  templateUrl: './demo8.component.html',
})
export class Demo8Component implements OnInit {

  public activity1Subject = new Subject();

  ngOnInit() {
    this.activity1();
  }

  activity1() {
    fromEvent(document, 'mousemove')
      .subscribe({
        next: (res: MouseEvent) => {
          const { clientX, clientY } = res;

          this.activity1Subject.next({ clientX, clientY });
        }
      });
  }
}
