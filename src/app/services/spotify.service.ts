import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class SpotifyService {

  constructor( private http: HttpClient) { 
    console.log('Servicio de Spotify cargado!')
   }

   getQuery( query: string ){
      const url = `https://api.spotify.com/v1/${query}`;
      // Headers
      const headers = new HttpHeaders({
        'Authorization' : 'Bearer BQCr7X_jhsYXro2yUSy82MJLAe1SzFGDGyXkEKKYEEHrORLqESEwSjDeA51mcqlsEOrtdVXwyglY_u9nZHQ'
      });
      return this.http.get(url, {headers} );
   }



   // Últimos 20 releases de la API Spotify
   getReleases() {
    return this.getQuery('browse/new-releases')
      .pipe( map( (data:any) => {
          return data.albums.items;
      }));
   }


   // Traer artista que coincida con el 'termino' introducido por el usuario desde el componente SEARCH HTML
   getArtistas( termino:string ){
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
      .pipe( map( (data:any) => {
        return data.artists.items;
    }));
  }

  getArtista( id:string ){
    return this.getQuery(`artists/${id}`);
    };

    topTracks( id:string ){
      return this.getQuery(`artists/${id}/top-tracks?country=ES`)
        .pipe( map( (data:any) => {
        return data.tracks;
      }));
    }
}