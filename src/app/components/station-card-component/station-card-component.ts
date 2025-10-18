import { Component, input } from '@angular/core';
import { Station } from '../../contracts/station';

@Component({
  selector: 'app-station-card-component',
  imports: [],
  templateUrl: './station-card-component.html',
  styleUrl: './station-card-component.css'
})
export class StationCardComponent {
  station = input<Station>();
}
