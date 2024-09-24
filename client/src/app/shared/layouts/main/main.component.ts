import { Component, input } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainLayoutComponent {
  screenMode = input<'full' | 'half'>();

  ngOnInit() {
    console.log(this.screenMode());
  }
}
