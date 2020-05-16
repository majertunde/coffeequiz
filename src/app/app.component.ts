import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coffeequiz';
  category = 'SAMPLE';
  id = 0;
  airdate = new Date();
  question = 'Sample question?';
  answer = 'Sample answer';
  showAnswer = false;
  counter = 0;
  categories : any;
  interval : any;

  showAnswerAfterTimeout() {
    clearTimeout(this.interval);
    var counter = this.counter;
    this.interval = setTimeout(() => {
      this.showAnswer = true;
    }, counter*1000);
  }

  getNewQuestion() {
    console.log('getting new question...');
    this.showAnswer = false;
    this.showAnswerAfterTimeout();
  }

  raiseGoodAnswerMessage() {
    console.log('good answer!');
    this.getNewQuestion();
  }

  raiseWrongAnswerMessage() {
    console.log('wrong answer!');
  }
}
