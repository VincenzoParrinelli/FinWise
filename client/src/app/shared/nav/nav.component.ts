import { Component, signal } from '@angular/core';

import { HomeSvgComponent } from '../../svg/nav/home/home.component';
import { AnalysisSvgComponent } from '../../svg/nav/analysis/analysis.component';
import { TransactionSvgComponent } from '../../svg/nav/transaction/transaction.component';
import { CategorySvgComponent } from '../../svg/nav/category/category.component';
import { ProfileSvgComponent } from '../../svg/nav/profile/profile.component';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    HomeSvgComponent,
    AnalysisSvgComponent,
    TransactionSvgComponent,
    CategorySvgComponent,
    ProfileSvgComponent,
    NgComponentOutlet,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  selectedSvg = signal(0);
}
