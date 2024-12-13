import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';

import { DateService } from '../services/date.service';

import { FullCalendarModule } from '@fullcalendar/angular';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
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
  private dateService = inject(DateService);
  private cdr = inject(ChangeDetectorRef);
  private calendarApi: Calendar | undefined;
  private prevClickedAnchor: HTMLElement | null = null;
  private selectedMonth = signal<string>(this.dateService.currMonthName);
  private selectedYear = signal<string>(this.dateService.currYearString);

  toggleMonthDropdown = signal<boolean>(false);
  toggleYearDropdown = signal<boolean>(false);
  allMonths = this.dateService.allMonths;
  yearsRange = this.dateService.yearsRange();

  @ViewChild('calendar') private calendar: any;
  @ViewChild('yearsDropdown')
  private yearsDropdown!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    if (this.calendar) this.calendarApi = this.calendar.getApi();
  }

  scrollToBottom() {
    if (this.yearsDropdown) {
      const dropdownElement = this.yearsDropdown.nativeElement;
      dropdownElement.scrollTop = dropdownElement.scrollHeight - 2300;
    }
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

          this.cdr.detectChanges();

          if (this.toggleYearDropdown()) {
            this.scrollToBottom();
          }
        },
      },
    },
  }));
}
