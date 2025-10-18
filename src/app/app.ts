import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StationCardComponent } from "./components/station-card-component/station-card-component";
import { HttpClient } from '@angular/common/http';
import { Station } from './contracts/station';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StationCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  stations: Station[] = [];

  protected readonly title = signal('oye-colombia');

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Station[]>('assets/data/stations.json').subscribe({
      next: (data) => (this.stations = data),
      error: (err) => console.log('Error al cargar las emisoras:', err)
    })
  }

}
