import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SPOTIFY_URL } from '../../Globals';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SpotifyService {

  private token: string;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token'); // initial token;
  }

  renewToken(): void {
    this.token = localStorage.getItem('token');
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(url, { headers });
  }


  getTokenSpotify(params): Observable<Object> {
    let header = new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded' });
    return this.http.post(SPOTIFY_URL, null, { headers: header, params: params })
  }

  // Últimos 20 releases de la API Spotify
  getReleases() {
    return this.getQuery('browse/new-releases')
      .pipe(map((data: any) => {
        return data.albums.items;
      }));
  }

  // Traer artista que coincida con el 'termino' introducido por el usuario desde el componente SEARCH HTML
  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
      .pipe(map((data: any) => {
        return data.artists.items;
      }));
  }

  getArtista(id: string): Observable<Object> {
    return this.getQuery(`artists/${id}`);
  };

  topTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=ES`)
      .pipe(map((data: any) => {
        return data.tracks;
      }));
  }
}