import { Component } from '@angular/core';

import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
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
export class CalendarComponent {
  prevClickedAnchor: HTMLElement | null = null;

  calendarOptions: CalendarOptions = {
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
      left: '',
      center: '',
      right: '',
    },
    customButtons: {
      monthsBtn: {
        text: '',
      },
    },
  };
}
