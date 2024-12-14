import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { Store } from '@ngrx/store';
import { TransactionsState } from '../store/transactions/transactions.model';
import { selectFilteredByDateTransactions } from '../store/transactions/transactions.selectors';
import * as TransactionsActions from '../store/transactions/transactions.actions';

import { DateService } from '../services/date.service';

import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { MainLayoutComponent } from '../shared/layouts/main/main.component';
import { CustomBtnComponent } from '../shared/custom-btn/custom-btn.component';
import { TransactionsListComponent } from '../shared/transactions-list/transactions-list.component';
import { ArrowDownComponent } from '../svg/arrow-down/arrow-down.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    MainLayoutComponent,
    FullCalendarModule,
    CustomBtnComponent,
    TransactionsListComponent,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements AfterViewInit {
  private viewContainerRef = inject(ViewContainerRef);
  private dateService = inject(DateService);
  private store = inject(Store<TransactionsState>);
  private cdr = inject(ChangeDetectorRef);
  private calendarApi: Calendar | undefined;
  private prevClickedDay: HTMLElement | null = null;
  private selectedMonth = signal<string>(this.dateService.currMonthName);
  private selectedYear = signal<string>(this.dateService.currYearString);

  toggleMonthDropdown = signal<boolean>(false);
  toggleYearDropdown = signal<boolean>(false);
  spendsBtnSelected = signal<boolean>(true);
  selectedDate = signal<Date | null>(null);
  filteredByDateTransactions = this.store.selectSignal(
    selectFilteredByDateTransactions
  );
  allMonths = this.dateService.allMonths;
  yearsRange = this.dateService.yearsRange();

  @ViewChild('calendar') private calendar!: FullCalendarComponent;
  @ViewChild('yearsDropdown')
  private yearsDropdown!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    if (this.calendar) this.calendarApi = this.calendar.getApi();
    this.updateMonthAndYearSelectors();
  }

  private updateMonthAndYearSelectors(): void {
    const monthSelector = this.getSelectorBtn('.fc-monthSelector-button')!;
    const yearSelector = this.getSelectorBtn('.fc-yearSelector-button')!;

    this.updateSelectorBtn(monthSelector, this.selectedMonth());

    this.updateSelectorBtn(yearSelector, this.selectedYear());
  }

  private getSelectorBtn(selector: string): HTMLDivElement | null {
    return this.calendar['element'].nativeElement.querySelector(selector);
  }

  private updateSelectorBtn(
    selectorBtn: HTMLDivElement,
    selectedValue: string
  ): void {
    const container = document.createElement('div');
    container.className = 'flex items-center gap-2';

    const span = document.createElement('span');
    span.textContent = selectedValue;
    container.appendChild(span);

    const svgRef = this.viewContainerRef.createComponent(ArrowDownComponent);
    container.appendChild(svgRef.location.nativeElement);

    selectorBtn.appendChild(container);
  }

  private updateCustomBtnMonth(): void {
    const customBtnRef = this.getSelectorBtn('.fc-monthSelector-button');

    if (!customBtnRef) return;

    const span = customBtnRef.querySelector('span')!;
    span.textContent = this.selectedMonth();
  }

  private updateCustomBtnYear(): void {
    const customBtnRef = this.getSelectorBtn('.fc-yearSelector-button');

    if (!customBtnRef) return;

    const span = customBtnRef.querySelector('span')!;
    span.textContent = this.selectedYear();
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
    this.updateCustomBtnMonth();
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
    this.updateCustomBtnYear();
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
      if (this.prevClickedDay) {
        this.prevClickedDay.style.backgroundColor = '';
        this.prevClickedDay.style.color = '';
      }

      const anchorTag = info.dayEl.querySelector('a');

      if (!anchorTag) return;

      anchorTag.style.backgroundColor = '#00D09E';
      anchorTag.style.color = '#000';

      this.prevClickedDay = anchorTag;

      this.selectedDate.set(info.date);

      this.store.dispatch(
        TransactionsActions.getTransactionsByDate({ date: info.date })
      );
    },

    headerToolbar: {
      left: 'monthSelector',
      center: '',
      right: 'yearSelector',
    },
    customButtons: {
      monthSelector: {
        text: '',
        click: () => {
          this.toggleYearDropdown.set(false);
          this.toggleMonthDropdown.set(!this.toggleMonthDropdown());
        },
      },
      yearSelector: {
        text: '',
        click: () => {
          this.toggleMonthDropdown.set(false);
          this.toggleYearDropdown.set(!this.toggleYearDropdown());

          this.cdr.detectChanges();

          if (this.toggleYearDropdown()) this.scrollToBottom();
        },
      },
    },
  }));
}
