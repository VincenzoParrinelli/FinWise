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

  yearsRange(range: number): number[] {
    const currYear = this.currDate.getFullYear();
    const startYear = currYear - range;
    const endYear = currYear + range;

    const yearsRange = Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i
    );

    return yearsRange;
  }
}
