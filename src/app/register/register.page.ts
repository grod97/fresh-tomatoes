import { Component, OnInit } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private message: string[];
  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.message = [];
  }

  register(
    name: IonInput,
    lastname: IonInput,
    email: IonInput,
    pass: IonInput)
    {
      if(name.value === undefined || name.value === '') { this.message.push('Name Field required');}
      if(lastname === undefined || lastname.value === '') { this.message.push('Last Name Field required');}
      if(email.value === undefined || email.value === '') { this.message.push('Email Field required');}
      if(pass.value === '' || pass.value === undefined) { this.message.push('Password Field required');}
      if(this.message.length > 0) { return; }

      this.moviesService.register(name.value, lastname.value, email.value, pass.value);
    }

}
