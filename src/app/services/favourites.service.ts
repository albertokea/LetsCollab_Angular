import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Favourite } from '../interfaces/favourite';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    /* this.baseUrl = 'http://localhost:3000/api/favourites'; */
    this.baseUrl = 'https://letscollab-back.herokuapp.com/api/favourites';
  }

  createHeaders() {
    return {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token_auth')
      })
    }
  }

  getByUser(iduser, offset): Promise<Favourite[]> {
    return this.httpClient.get<Favourite[]>(`${this.baseUrl}/${iduser}/offset/${offset}`, this.createHeaders()).toPromise()
  }

  getCountByPost(idpost): Promise<Favourite[]> {
    return this.httpClient.get<Favourite[]>(`${this.baseUrl}/count/${idpost}`, this.createHeaders()).toPromise()
  }

}
