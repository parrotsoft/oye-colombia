import { Component, input, inject } from '@angular/core';
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

  private nowPlaying = inject(NowPlayingService);

  onPlay(): void {
    const s = this.station();
    if (s) this.nowPlaying.play(s);
  }

  onPause(): void {
    this.nowPlaying.stop();
  }
}
