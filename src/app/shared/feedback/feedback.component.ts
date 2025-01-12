import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { FeedbackData } from '../../features/models/feedback.model';

@Component({
  selector: 'app-feedback',
  imports: [CommonModule, MatIconModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: FeedbackData,
    private snackRef: MatSnackBarRef<FeedbackComponent>
  ) {}

  close(): void {
    this.snackRef.dismiss();
  }

  showPrefixIcon(): boolean {
    return ['error', 'warning', 'success'].includes(this.data.type);
  }
}
