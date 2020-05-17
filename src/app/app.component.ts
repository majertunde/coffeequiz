import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private serverAddress = "http://jservice.io";
  title = 'coffeequiz';

  showAnswer = false;
  counter = 0;
  categoryListOffset = 0;
  categoryList : any;
  categoryName : any;
  categoryId : any;
  questionId : any;
  airdate : any;
  question : any;
  answer : any;
  categories : any;
  interval : any;

  ngOnInit(): void {
    this.getRandomQuestion();
    this.getCategoryList();
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

  sendHttpRequest =(method, path) => {
    const promise = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, this.serverAddress+path);
      xhr.responseType = 'json';
      xhr.onload = () => {
        if (xhr.status >= 400) {
          reject(xhr.response);
        } else {
          resolve(xhr.response);
        }
      };
      xhr.onerror = () => {
        reject('Something went wrong!');
      };
      xhr.send();
    });
    return promise;
  };
  
  getRandomQuestion() {
    this.sendHttpRequest('GET','/api/random').
    then( responseData => {
      this.getQuestionDataFromResult(responseData)
    });
  }

  getQuestionDataFromResult(responseData) {
    this.questionId = responseData[0].id;
    this.question = responseData[0].question;
    this.airdate = responseData[0].airdate;
    this.answer = responseData[0].answer;
    this.categoryId = responseData[0].category_id;
    this.categoryName = responseData[0].category.title;
  }

  getCategoryList() {
    this.sendHttpRequest('GET','/api/categories?count=100&offset=' + this.categoryListOffset).
    then( responseData => {
      this.categoryList = responseData;
    });
  }
}
