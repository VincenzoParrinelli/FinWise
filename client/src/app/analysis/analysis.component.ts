import { Component } from '@angular/core';
import { MainLayoutComponent } from '../shared/layouts/main/main.component';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [MainLayoutComponent],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss',
})
export class AnalysisComponent {}
