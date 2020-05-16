import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coffeequiz';
  showAnswer = false;
  counter = 0;
  category : any;
  categoryId : any;
  id : any;
  airdate : any;
  question : any;
  answer : any;
  categories : any;
  interval : any;
  result : any;

  ngOnInit(): void {
    this.getRandomQuestion();
  }

  showAnswerAfterTimeout() {
    clearTimeout(this.interval);
    var counter = this.counter;
    this.interval = setTimeout(() => {
      this.showAnswer = true;
    }, counter*1000);
  }

  getNewQuestion() {
    this.showAnswer = false;
    (<HTMLInputElement>document.getElementById("ans")).value = "";
    this.getRandomQuestion();
    this.showAnswerAfterTimeout();
  }

  getConfirmation() {
    var retVal = confirm("Good answer! Ready for a new question?");
    this.showAnswer = true;
    if( retVal == true ) {
      this.getNewQuestion();
    }
  }

  raiseWrongAnswerMessage() {
    alert("Wrong answer! Try again!");
  }
  
  getRandomQuestion() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://jservice.io/api/random');
    xhr.onload = () => {
      console.log(xhr.response);
      this.result = JSON.parse(xhr.response)[0];
      this.getQuestionDataFromResult();
    };
    xhr.send();
  }

  getQuestionDataFromResult() {
    this.id = this.result.id;
    this.question = this.result.question;
    this.airdate = this.result.airdate;
    this.answer = this.result.answer;
    this.categoryId = this.result.category_id;
  }
}
