import { Injectable } from '@angular/core';
import { FeedbackData } from '../../features/models/feedback.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FeedbackComponent } from '../feedback/feedback.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  config: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'end',
    verticalPosition: 'top',
  };

  constructor(private snackBar: MatSnackBar) {}

  show(message: string): void {
    this.config.data = new FeedbackData(message, 'success');
    this.snackBar.openFromComponent(FeedbackComponent, this.config);
  }

  error(message: string): void {
    this.config.data = new FeedbackData(message, 'error');
    this.snackBar.openFromComponent(FeedbackComponent, this.config);
  }

  warn(message: string): void {
    this.config.data = new FeedbackData(message, 'warning');
    this.snackBar.openFromComponent(FeedbackComponent, this.config);
  }

  httpWarn(errorHttp: HttpErrorResponse): void {
    const message =
      errorHttp?.error?.message || errorHttp?.message || errorHttp;
    this.config.data = new FeedbackData(message, 'warning');
    this.snackBar.openFromComponent(FeedbackComponent, this.config);
  }

  httpError(errorHttp: HttpErrorResponse): void {
    const message =
      errorHttp?.error?.message || errorHttp?.message || errorHttp;
    this.config.data = new FeedbackData(message, 'error');
    this.snackBar.openFromComponent(FeedbackComponent, this.config);
  }

  neutral(message: string): void {
    this.config.data = new FeedbackData(message, 'neutral');
    this.snackBar.openFromComponent(FeedbackComponent, this.config);
  }

  dismiss(): any {
    this.snackBar.dismiss();
  }
}
