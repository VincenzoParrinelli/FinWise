import { Injectable } from '@angular/core';

import { Category } from './category.model';

import { CarComponent } from './svg/categories/car/car.component';
import { EntertainmentComponent } from './svg/categories/entertainment/entertainment.component';
import { GiftComponent } from './svg/categories/gift/gift.component';
import { GroceriesComponent } from './svg/categories/groceries/groceries.component';
import { MedicineComponent } from './svg/categories/medicine/medicine.component';
import { NewHomeComponent } from './svg/categories/new-home/new-home.component';
import { RentComponent } from './svg/categories/rent/rent.component';
import { SavingComponent } from './svg/categories/saving/saving.component';
import { SilverwareComponent } from './svg/categories/silverware/silverware.component';
import { TransportComponent } from './svg/categories/transport/transport.component';
import { TravelComponent } from './svg/categories/travel/travel.component';
import { WeddingComponent } from './svg/categories/wedding/wedding.component';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[] = [
    {
      id: 0,
      name: 'Silverware',
      svgComponent: SilverwareComponent,
    },
    {
      id: 1,
      name: 'Transport',
      svgComponent: TransportComponent,
    },
    {
      id: 2,
      name: 'Groceries',
      svgComponent: GroceriesComponent,
    },
    {
      id: 3,
      name: 'Rent',
      svgComponent: RentComponent,
    },
    {
      id: 4,
      name: 'Gift',
      svgComponent: GiftComponent,
    },
    {
      id: 5,
      name: 'Medicine',
      svgComponent: MedicineComponent,
    },
    {
      id: 6,
      name: 'Entertainment',
      svgComponent: EntertainmentComponent,
    },
    {
      id: 7,
      name: 'Saving',
      svgComponent: SavingComponent,
    },
    {
      id: 8,
      name: 'Travel',
      svgComponent: TravelComponent,
    },
    {
      id: 9,
      name: 'New Home',
      svgComponent: NewHomeComponent,
    },
    {
      id: 10,
      name: 'Car',
      svgComponent: CarComponent,
    },
    {
      id: 11,
      name: 'Wedding',
      svgComponent: WeddingComponent,
    },
  ];

  getAllCategories(): Category[] {
    return this.categories;
  }

  get categoryNames(): string[] {
    return this.categories.map((category) => category.name);
  }
}
