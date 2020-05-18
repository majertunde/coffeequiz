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
  showRandomCategoryTitle = true;
  timeoutCounter = -1;
  categoryListOffset = 0;
  selectedCategoryId = -1;
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
    this.getHundredCategory();
  }

  showAnswerAfterTimeout() {
    clearTimeout(this.interval);
    if (this.timeoutCounter >= 0) {
      var counter = this.timeoutCounter;
      this.interval = setTimeout(() => {
        this.showAnswer = true;
      }, counter*1000);
    } else {
      this.showAnswer = false;
    }
  }

  getNewQuestion() {
    this.showAnswer = false;
    (<HTMLInputElement>document.getElementById("ans")).value = "";
    if (this.selectedCategoryId < 0) {
      this.getRandomQuestion();
      this.showRandomCategoryTitle = true;
    } else {
      this.getQuestionFromSelectedCategory();
      this.showRandomCategoryTitle = false;
    }
    this.showAnswerAfterTimeout();
  }

  raiseNewQuestionConfirmation() {
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

  getHundredCategory() {
    this.sendHttpRequest('GET','/api/categories?count=100&offset=' + this.categoryListOffset).
    then( responseData => {
      this.categoryList = responseData;
    });
  }

  showNextHundredCategory() {
    this.categoryListOffset += 100;
    this.getHundredCategory();
  }

  showPreviousHundredCategory() {
    this.categoryListOffset -= 100;
    this.getHundredCategory();
  }
  
  getRandomQuestion() {
    this.sendHttpRequest('GET','/api/random').
    then( responseData => {
      this.getQuestionDataFromResult(responseData[0])
    });
  }

  getQuestionFromSelectedCategory() {
    this.sendHttpRequest('GET','/api/clues?category=' + this.selectedCategoryId).
    then( (responseData:JSON[]) => {
      var random = Math.floor(Math.random() * responseData.length);
      this.getQuestionDataFromResult(responseData[random]);
    });
  }

  getQuestionDataFromResult(responseData) {
    this.questionId = responseData.id;
    this.question = responseData.question;
    this.airdate = responseData.airdate;
    this.answer = responseData.answer;
    this.categoryId = responseData.category_id;
    this.categoryName = responseData.category.title;
  }
}
