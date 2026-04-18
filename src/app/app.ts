import { Component, signal, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { StationCardComponent } from './components/station-card-component/station-card-component';
import { HttpClient } from '@angular/common/http';
import { Station } from './contracts/station';
import { NowPlayingService } from './services/now-playing.service';

@Component({
  selector: 'app-root',
  imports: [StationCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  stations: Station[] = [];

  protected readonly title = signal('oye-colombia');
  protected readonly nowPlaying = inject(NowPlayingService);

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private titleService: Title,
    private metaService: Meta,
  ) {
    this.titleService.setTitle('OyeColombia — Emisoras de Radio de Colombia en Vivo');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Escucha en vivo las mejores emisoras de radio de Colombia: Caracol, W Radio, Radioactiva, Los 40, Tropicana, Olímpica y más de 30 emisoras. Gratis, sin descargas.',
    });
  }

  ngOnInit() {
    this.http.get<Station[]>('assets/data/stations.json').subscribe({
      next: (data) => {
        this.stations = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.log('Error al cargar las emisoras:', err),
    });
  }
}


