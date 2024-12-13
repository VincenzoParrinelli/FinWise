import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private currDate = new Date();

  private months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  get allMonths(): string[] {
    return this.months;
  }

  get currMonthName(): string {
    const currentMonth = new Date().getMonth();
    const monthName = new Date(0, currentMonth).toLocaleString('eng', {
      month: 'long',
    });

    return monthName;
  }

  getMonthIndex(month: string): number {
    return this.months.indexOf(month);
  }

  get currYearNumber(): number {
    return this.currDate.getFullYear();
  }

  get currYearString() {
    return this.currDate.getFullYear().toString();
  }

  yearsRange(): number[] {
    const currentCenturyStart = Math.floor(1900 / 100) * 100;

    const yearsRange = Array.from(
      { length: currentCenturyStart + 200 - 1900 + 1 },
      (_, i) => currentCenturyStart + i
    );

    return yearsRange;
  }
}
