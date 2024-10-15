import { Component, inject, input } from '@angular/core';
import { NavComponent } from '../../nav/nav.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainLayoutComponent {
  screenMode = input<'full' | 'half'>();
  router = inject(Router);
}
