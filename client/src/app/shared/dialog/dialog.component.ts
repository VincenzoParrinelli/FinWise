import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  open = input(false);
  closeEmitter = output();

  closeDialogEmit() {
    this.closeEmitter.emit();
  }
}
