import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {

  artista:any = {}
  loading:boolean;
  topTrack:any[] = [];

  constructor( private route: ActivatedRoute,
                private spotify: SpotifyService) {


    this.loading = true;
    this.route.params.subscribe( params => {
      this.getArtista(params['id']);
      this.topTracks(params['id']);
    } )
   }

  ngOnInit(): void {
  }

  getArtista(id:string) {
    this.spotify.getArtista(id).subscribe(artista => {
      this.artista = artista;
      console.log(artista)
      this.loading = false;
    });
  }

  topTracks(id:string){
    this.spotify.topTracks(id).subscribe( topTracks => {
      this.topTrack = topTracks;
    })
  }
}
