import { Component, input, inject, viewChild, ElementRef } from '@angular/core';
import { Station } from '../../contracts/station';
import { NowPlayingService } from '../../services/now-playing.service';

@Component({
  selector: 'app-station-card-component',
  imports: [],
  templateUrl: './station-card-component.html',
  styleUrl: './station-card-component.css',
})
export class StationCardComponent {
  station = input<Station>();

  private audioEl = viewChild<ElementRef<HTMLAudioElement>>('audioEl');
  private nowPlaying = inject(NowPlayingService);

  onPlay(): void {
    const s = this.station();
    const audio = this.audioEl()?.nativeElement;
    if (s && audio) this.nowPlaying.play(s, audio);
  }

  onPause(): void {
    this.nowPlaying.stop();
  }
}
