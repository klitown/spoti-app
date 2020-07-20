import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public nuevasCanciones:any[] = [];
  public loading:boolean;
  public error: boolean;
  public mensajeError: string;

  constructor( private http: HttpClient,
                private spotifyService: SpotifyService) { 

   this.loading = true;

  }

  ngOnInit(): void {

    // Últimos 20 releases de la API Spotify desde el Servicio de Spotify
    this.spotifyService.getReleases()
    .subscribe( (data: any) => {
      this.nuevasCanciones = data;
      this.loading = false;
      
    }, (errorService) => {
      this.loading = false;
      this.error = true;
      console.log(errorService);
      this.mensajeError = (errorService.error.error.message);
    });


  }

}
