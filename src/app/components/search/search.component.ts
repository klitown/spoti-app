import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public artistas: any[] = [];
  public loading: boolean;
  searchChangeObserver: Observer<any>

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void { }

  searchArtist(searchValue: string) {
    if (!this.searchChangeObserver) {
      new Observable(observer => {
        this.searchChangeObserver = observer;
      }).pipe(debounceTime(700)) // wait 300ms after the last event before emitting last event
        .pipe(distinctUntilChanged()) // only emit if value is different from previous value
        .subscribe(
          (data: any) => this.buscarArtista(data),
          (error: any) => console.error(error)
        );
    }
    this.searchChangeObserver.next(searchValue);
  }

  buscarArtista(termino: string) {
    if (termino !== '') {
      this.spotifyService.getArtistas(termino)
        .subscribe((data: any) => {
          this.artistas = data;
          this.loading = false;
        });
    } else {
      this.artistas = [];
    }
  };

}