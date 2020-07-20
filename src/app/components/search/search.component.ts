import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  public artistas:any[] = [];
  public loading:boolean;

  constructor( private spotifyService: SpotifyService) {
    this.loading = true;
   }

  ngOnInit(): void {
  }


  // Buscar artista por 'Termino' introducido por el usuario en 'search.component.html'
  buscarArtista(termino:string) {
    this.spotifyService.getArtistas( termino )
      .subscribe( (data:any) => {
      this.artistas = data;
      this.loading = false;
    });
  };

}
