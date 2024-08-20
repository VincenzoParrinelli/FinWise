import { Component } from '@angular/core';
import { VectorComponent } from '../svg/vector/vector.component';

@Component({
  selector: 'app-launch',
  standalone: true,
  imports: [VectorComponent],
  templateUrl: './launch.component.html',
  styleUrl: './launch.component.scss',
})
export class LaunchComponent {}
