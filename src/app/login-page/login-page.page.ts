import { HttpClient } from '@angular/common/http';
import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { DataToken } from './data-token';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {

  private logged = false;
  private message = '';
  constructor(private httpClient: HttpClient, private router: Router,
     private storage: Storage ) {
       this.storage.create();
      }

  ngOnInit() {
  }

  async login(email: IonInput, pass: IonInput) {
    if(email.value === undefined
       || email.value === ''
       || pass.value === ''
       || pass.value === undefined)
       { this.message = 'Fields required'; return;}
    await this.httpClient.post<DataToken>(
      'https://mysterious-shore-81974.herokuapp.com/api/v1/user/login',{email: email.value, password: pass.value})
    .subscribe(data => {
     if(data.token !== undefined || data.token !== ''){
       this.storage.set('id', data.id).then();
       this.storage.set('token', data.token)
       .then(() => {
         email.value = '';
         pass.value = '';
         this.logged = true;
        this.router.navigate(['./movies-page']);
       }).catch(er => console.log(er));
     }
    });
  }

  async logOut()
  {
    this.storage.remove('id').then();
    this.storage.remove('token').then();
    this.logged = false;
  }

  go()
  {
    this.storage.get('token').then((x) => {
      this.router.navigate(['./movies-page']);
    });
  }

}
