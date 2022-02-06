import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { CLIENT_REQUEST, CLIENT_ID } from '../../../Globals';

interface TOKEN {
  access_token: string;
  expires_in: number;
  token_type: string,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public nuevasCanciones: any[] = [];
  public loading: boolean;
  public error: boolean;
  public mensajeError: string;
  private tokenData = {
    grant_type: 'client_credentials',
    client_id: CLIENT_ID,
    client_secret: CLIENT_REQUEST
  }

  constructor(
    private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getLastReleases();
  }

  getLastReleases(): void {
    this.loading = true;
    // Últimos 20 releases de la API Spotify desde el Servicio de Spotify
    this.spotifyService.getReleases()
      .subscribe((data: any) => {
        this.nuevasCanciones = data;
      }, (errorService) => {
        this.error = true;
        console.log(errorService);
        this.mensajeError = (errorService.error.error.message);
      }, () => this.loading = false);
  }

  getToken() {
    this.loading = true;
    this.spotifyService.getTokenSpotify(this.tokenData)
      .subscribe((data: TOKEN) => {
        localStorage.setItem('token', data.access_token);
        this.spotifyService.renewToken();
        this.error = false;
      }, error => {
        console.log(error);
      }, () => {
        this.getLastReleases();
        this.loading = false;
      })
  }

}
