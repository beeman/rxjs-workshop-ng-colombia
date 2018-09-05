import { Component } from '@angular/core';

@Component({
  selector: 'app-demo0',
  templateUrl: './demo0.component.html',
})
export class Demo0Component {
  person = {
    name: 'Bram Borggreve',
    avatar: 'https://avatars3.githubusercontent.com/u/36491',
    facts: [
      '🇳🇱 Born in the Netherlands',
      '🛫 Living abroad since 2015',
      '🤓 Freelance softare engineer',
      '👨‍🏫 Instructor at @eggheadio',
      '👨‍💻 Author at @PacktPub',
    ],
  };
}
