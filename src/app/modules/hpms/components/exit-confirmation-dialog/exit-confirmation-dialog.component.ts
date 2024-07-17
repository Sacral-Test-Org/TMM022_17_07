import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-exit-confirmation-dialog',
  templateUrl: './exit-confirmation-dialog.component.html',
  styleUrls: ['./exit-confirmation-dialog.component.css']
})
export class ExitConfirmationDialogComponent {
  @Output() confirmExit = new EventEmitter<boolean>();

  showDialog(): void {
    // Logic to display the confirmation dialog
    const userConfirmed = confirm('Do you want to exit?');
    if (userConfirmed) {
      this.onYesClick();
    } else {
      this.onNoClick();
    }
  }

  onYesClick(): void {
    // Emit true value to indicate user confirmed exit
    this.confirmExit.emit(true);
  }

  onNoClick(): void {
    // Emit false value to indicate user canceled exit
    this.confirmExit.emit(false);
  }
}
