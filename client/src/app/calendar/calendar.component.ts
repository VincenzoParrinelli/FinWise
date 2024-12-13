import {
  AfterViewInit,
  Component,
  computed,
  inject,
  signal,
  ViewChild,
} from '@angular/core';

import { DateService } from '../services/date.service';

import { FullCalendarModule } from '@fullcalendar/angular';
import { Calendar, CalendarApi, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { MainLayoutComponent } from '../shared/layouts/main/main.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MainLayoutComponent, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements AfterViewInit {
  dateService = inject(DateService);
  allMonths = this.dateService.allMonths;
  yearsRange = this.dateService.yearsRange(100);
  prevClickedAnchor: HTMLElement | null = null;
  toggleMonthDropdown = signal<boolean>(false);
  toggleYearDropdown = signal<boolean>(false);
  selectedMonth = signal<string>(this.dateService.currMonthName);
  selectedYear = signal<string>(this.dateService.currYearString);

  @ViewChild('calendar') calendar: any;
  calendarApi: Calendar | undefined;

  ngAfterViewInit() {
    if (this.calendar) this.calendarApi = this.calendar.getApi();
  }

  setMonth(month: string, i: number) {
    this.toggleMonthDropdown.set(false);

    const selectedDate = new Date(this.dateService.currYearNumber, i, 1);

    this.selectedMonth.set(month);
    this.calendarApi?.gotoDate(selectedDate);
  }

  setYear(year: number) {
    this.toggleYearDropdown.set(false);

    const selectedDate = new Date(
      year,
      this.dateService.getMonthIndex(this.selectedMonth()),
      1
    );

    this.selectedYear.set(year.toString());
    this.calendarApi?.gotoDate(selectedDate);
  }

  calendarOptions = computed<CalendarOptions>(() => ({
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    selectable: true,
    showNonCurrentDates: false,
    weekNumberCalculation: 'ISO',
    fixedWeekCount: false,

    dateClick: (info) => {
      if (this.prevClickedAnchor) {
        this.prevClickedAnchor.style.backgroundColor = '';
        this.prevClickedAnchor.style.color = '';
      }

      const anchorTag = info.dayEl.querySelector('a');

      if (anchorTag) {
        anchorTag.style.backgroundColor = '#00D09E';
        anchorTag.style.color = '#000';

        this.prevClickedAnchor = anchorTag;
      }
    },

    headerToolbar: {
      left: 'monthsSelector',
      center: '',
      right: 'yearsSelector',
    },
    customButtons: {
      monthsSelector: {
        text: this.selectedMonth(),
        click: () => {
          this.toggleYearDropdown.set(false);
          this.toggleMonthDropdown.set(!this.toggleMonthDropdown());
        },
      },
      yearsSelector: {
        text: this.selectedYear(),
        click: () => {
          this.toggleMonthDropdown.set(false);
          this.toggleYearDropdown.set(!this.toggleYearDropdown());
        },
      },
    },
  }));
}
