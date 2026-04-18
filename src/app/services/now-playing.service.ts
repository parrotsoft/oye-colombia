import { Injectable, signal } from '@angular/core';
import { Station } from '../contracts/station';

@Injectable({ providedIn: 'root' })
export class NowPlayingService {
  readonly current = signal<Station | null>(null);

  play(station: Station): void {
    this.current.set(station);
  }

  stop(): void {
    this.current.set(null);
  }
}
