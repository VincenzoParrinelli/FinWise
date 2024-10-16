import { Component, input } from '@angular/core';

@Component({
  selector: 'app-svg-analysis',
  standalone: true,
  imports: [],
  templateUrl: './analysis.component.svg',
})
export class AnalysisSvgComponent {
  strokeColor = input<string>('stroke-light-green');
}
