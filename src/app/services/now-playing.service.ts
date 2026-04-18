import { Injectable, signal } from '@angular/core';
import { Station } from '../contracts/station';

@Injectable({ providedIn: 'root' })
export class NowPlayingService {
  readonly current = signal<Station | null>(null);

  private activeAudio: HTMLAudioElement | null = null;

  play(station: Station, audio: HTMLAudioElement): void {
    if (this.activeAudio && this.activeAudio !== audio) {
      this.activeAudio.pause();
    }
    this.activeAudio = audio;
    this.current.set(station);
  }

  stop(audio: HTMLAudioElement): void {
    if (this.activeAudio === audio) {
      this.activeAudio = null;
      this.current.set(null);
    }
  }
}
