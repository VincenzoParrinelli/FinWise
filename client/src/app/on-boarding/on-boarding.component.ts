import { Component } from '@angular/core';
import { CircleComponent } from '../svg/circle/circle.component';
import { MainComponent } from '../shared/layouts/main/main.component';

@Component({
  selector: 'app-on-boarding',
  standalone: true,
  imports: [CircleComponent, MainComponent],
  templateUrl: './on-boarding.component.html',
  styleUrl: './on-boarding.component.scss',
})
export class OnBoardingComponent {}
