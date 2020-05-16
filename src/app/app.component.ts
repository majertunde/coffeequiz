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
  categories : any;
}
