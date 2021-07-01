import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { MoviesService } from '../movies.service';
import { Movie } from './movie';

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.page.html',
  styleUrls: ['./movies-page.page.scss'],
})
export class MoviesPagePage implements OnInit {

  movies: Movie[];

  constructor(private storage: Storage, private moviesService: MoviesService, private router: Router) { }

  async ngOnInit() {
    this.storage.get('token').then(async () => {
      const result = await this.moviesService.getToken();
      const m = this.moviesService.getMovies(result);
      m.subscribe(data => this.movies = data);
    }).catch(() => this.router.navigate(['login']));
    this.movies = [];
  }

  async filter(by: IonInput, income: IonInput)
  {
    let filter = '';
    let byfilter = '';
    let incomefilter = '';
    if(by.value !== undefined || by.value !== '' ){
      byfilter = `by=${by.value}`;
    }
    if(income.value !== undefined || income.value !== '' )
    {
      incomefilter = `income=${income.value}`;
    }
    if(byfilter !== '' ){
      filter = byfilter ;
    }
    if(incomefilter !== ''){
      if(filter !== ''){
        filter += '&' + incomefilter;
      }else
      {
        filter = incomefilter;
      }
    }
    if(filter !== ''){
      this.moviesService.getToken().then((x) => {
        this.moviesService.getMovies(x, filter).subscribe(data => {
          this.movies = data;
          console.log(data);
        });
      });
    }
  }

}
