import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Log In', url: 'login', icon: 'log-in' },
    { title: 'Register', url: 'register', icon: 'person-add' },
    { title: 'Movies', url: 'movies-page', icon: 'videocam' }
  ];
  public labels = [];
  constructor() {}
}
