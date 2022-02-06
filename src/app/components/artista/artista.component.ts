import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {

  artista: any = {}
  loading: boolean;
  topTrack: any[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private spotify: SpotifyService) {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.getArtista(params['id']);
      this.topTracks(params['id']);
    })
  }

  ngOnInit(): void { }

  getArtista(id: string) {
    this.spotify.getArtista(id)
      .subscribe(
        (artista: any) => this.artista = artista,
        (error: any) => console.log(error),
        () => this.loading = false
      );
  }

  topTracks(id: string) {
    this.spotify.topTracks(id)
      .subscribe(topTracks => this.topTrack = topTracks)
  }

  volverBusqueda(): void {
    this.router.navigateByUrl('search');
  }
}