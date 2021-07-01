import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ParamMap, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Movie } from './movies-page/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService{

  private url = 'https://mysterious-shore-81974.herokuapp.com/api/v1/';
  private movies;
  constructor(private router: Router, private httpClient: HttpClient, private storage: Storage ) {
    this.storage.create();
   }

 getToken()
  {
    return this.storage.get('token');
  }

  getMovies(token: string, filter?: string) {
    return this.httpClient.get<Movie[]>(this.url + 'movies?' + filter,
    {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        auth_token:
          // eslint-disable-next-line max-len
        token
      }
    });
  }

  getMovie(token: string, id: string) {
    return this.httpClient.get(this.url + `movies/${id}`,
    {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        auth_token:
          // eslint-disable-next-line max-len
        token
      }
    });
  }

  vote(upvote: boolean, id: string,rtn, review: string)
  {
    const text = review.substring(0, 200);
    const route = upvote ? 'upvote' : 'downvote';
    this.getToken().then((x) => {
      this.httpClient.post(this.url + `movies/${route}/${id}`,
      {
        critic: rtn,
        note: text
      },
      {
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          auth_token:
          x
        }
      }).subscribe((c) => console.log(c));
    });
  }

  register(name, lastname, email, pass)
  {
    this.httpClient.post(
      'https://mysterious-shore-81974.herokuapp.com/api/v1/user/register',
      {
        name,
        lastname,
        email,
        password: pass
      }).subscribe((data) => {
        this.router.navigate(['login']);
      });
  }
}
