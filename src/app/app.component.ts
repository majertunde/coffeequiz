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

  setTimeOut() {
    clearInterval(this.interval);
    var counter = this.counter;   
    this.interval = setInterval(() => {
      console.log(counter);
      if (counter == 0) {
        this.showAnswer = true;
      }

      counter--;

      if (counter < 0 ) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  getNewQuestion() {
    console.log('getting new question...');
    this.showAnswer = false;
    this.setTimeOut();
  }

  raiseGoodAnswerMessage() {
    console.log('good answer!');
    this.getNewQuestion();
  }

  raiseWrongAnswerMessage() {
    console.log('wrong answer!');
  }
}
