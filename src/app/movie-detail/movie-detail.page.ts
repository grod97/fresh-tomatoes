import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInput, IonSelect } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {

  private movie;
  private reviews = [];
  private canVote = false;
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private movieService: MoviesService) { }

  async ngOnInit() {
    this.activateRoute.paramMap.subscribe(async (data) => {
      if(!data) { this.router.navigate(['movies-page']);}
      const token = await this.movieService.getToken();
     const m = await this.movieService.getMovie(token, data.get('movie'));
     m.subscribe(movie =>
      { if(movie === null) {
         this.router.navigate(['movies-page']);}
         this.movie = movie;
         this.reviews = movie['reviews'];
         this.storage.get('id').then(
          (id) => {
            if(this.reviews.find((re) => re.id === id) === undefined) {
              this.canVote = true;
            }else{
              this.canVote = false;
            }
          }
         );
      });
    });
    this.movie = {
      name: '',
      poster_url: '',
      gross_income: '',
      reviews : []
    };
  }

  public upvote(rtn: IonSelect, review: IonInput)
  {
    if(rtn.value === undefined || review.value === undefined){ return; }
    this.movieService.vote(true,this.movie.id, rtn.value, review.value.toString());
    this.router.navigate(['movies-page']);
  }

  public downvote(rtn: IonSelect, review: IonInput)
  {
    if(rtn.value === undefined || review.value === undefined){ return; }
    this.movieService.vote(false,this.movie.id,rtn.value, review.value.toString());
    this.router.navigate(['movies-page']);
  }

}
