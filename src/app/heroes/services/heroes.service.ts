import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroe.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private baseURL: string = environment.apiURL;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseURL}/heroes`);
  }

  getHeroeById(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.baseURL}/heroes/${id}`);
  }

  getHeroesByName(termino: string): Observable<Heroe[]> {

    const params = new HttpParams()
      .set('q', termino)
      .set('_limit', 6);

    return this.http.get<Heroe[]>(`${this.baseURL}/heroes`, {params: params});
  }
  
}
