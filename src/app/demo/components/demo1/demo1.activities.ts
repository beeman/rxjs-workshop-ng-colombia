export const intro = {
  title: 'Handling events',
  description: [
    `In this demo we use different ways to listen to the events of a button click.`,
  ],
  showContent: false,
  showResult: false,
};

export const info1 = {
  title: 'Activity 1: addEventListener',
  description: [
    'In this activity we listen to a button click using the default <code>addEventListener</code> method provided by the browser.'
  ],
  solution: `this.button1.addEventListener('click', (event) => {
  this.result1 = {x: event.clientX, y: event.clientY};
});`,
  steps: [
    {
      step: `Call the <code>addEventListener</code> method at the element reference.`,
      code: `this.button1.addEventListener();`,
    },
    {
      step: `Set the name of the event to <code>click</code>.`,
      code: `this.button1.addEventListener('click');`,
    },
    {
      step: `Create a callback method that takes a parameter <code>event</code>.`,
      code: `this.button1.addEventListener('click', (event) => {});`,
    },
    {
      step: `In the callback, assign an object to the vale of <code>info1.result</code>.`,
      code: `this.result1 = {};`,
    },
    {
      step: `Add the keys <code>x</code> and <code>y</code> and assign the values of <code>event.clientX</code> and <code>event.clientY</code>`,
      code: `this.result1 = { x: event.clientX, y: event.clientY };`,
    },
  ],
};

export const info2 = {
  title: 'Activity 2: fromEvent',
  description: [
    `The second button uses the <code>fromEvent</code> Observable.`
  ],
  solution: `this.button2$ = fromEvent(this.button2, 'click');
this.activity2sub = this.button2$.subscribe((event: MouseEvent) => {
  this.result2 = {x: event.clientX, y: event.clientY};
});`,
  steps: [
    {
      step: `Import <code>fromEvent</code> from <code>rxjs</code>.`,
      code: `import { fromEvent } from 'rxjs';`,
    },
    {
      step: `Assign the <code>fromEvent</code> operator to <code>this.button2$</code>.`,
      code: `this.button2$ = fromEvent()`,
    },
    {
      step: `The first parameter is the reference to <code>this.button2</code>.`,
      code: `this.button2$ = fromEvent(this.button2)`,
    },
    {
      step: `The second parameter is the name of the event, <code>click</code>.`,
      code: `this.button2$ = fromEvent(this.button2, 'click')`,
    },
    {
      step: `To store the subscription assign <code>this.button2$</code> to <code>this.activity2sub</code>.`,
      code: `this.activity2sub = this.button2$`,
    },
    {
      step: `Call the <code>subscribe()</code> method`,
      code: `this.activity2sub = this.button2$.subscribe();`,
    },
    {
      step: `Add a method that takes a parameter <code>event</code> of type <code>MouseEvent</code>.`,
      code: `this.activity2sub = this.button2$.subscribe((event: MouseEvent) => {});`,
    },
    {
      step: ` `,
      code: `this.result2 = { };`,
    },
    {
      step: ` `,
      code: `this.result2 = { x: event.clientX, y: event.clientY };`,
    },
  ],
};

export const info3 = {
  title: 'Activity 3: fromEvent',
  description: [
    `The second button uses the <code>fromEvent</code> Observable.`
  ],
  solution: `this.activity3sub = fromEvent(document, 'click')
  .subscribe((res: MouseEvent) => {
    this.result3 = {x: res.clientX, y: res.clientY};
  });`,
  steps: [
    {
      step: ``,
      code: ``,
    },
  ],
};

export const info4 = {
  title: 'Exercise 1: unsubscribing',
  description: [
    `To prevent memory leaks, we should always consider unsubscribing from our Observables.`,
    `We can do this using the <code>ngOnDestroy</code> method, that Angular runs during the Component tear down.`,
    `In order to unsubscribe we need to store a reference to the subscription, what we did in the previous activities.`,
  ],
  solution: `ngOnDestroy() {
  this.activity2sub.unsubscribe();
  this.activity3sub.unsubscribe();
}`,
  steps: [
    {
      step: `In the ngOnDestroy method add call into the <code>unsubscribe()</code> method on <code>this.activity2sub</code>`,
      code: `this.activity2sub.unsubscribe()`,
    },
    {
      step: `Do the same for <code>this.activity3sub</code>`,
      code: `this.activity3sub.unsubscribe()`,
    },
  ],
};
