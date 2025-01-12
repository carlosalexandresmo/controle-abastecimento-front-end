import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ISupply } from '../../../models/supply.model';
import { SupplyService } from '../../../services/supply.service';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../../../../shared/services/feedback.service';

@Component({
  selector: 'app-remove',
  imports: [CommonModule, MatButtonModule, MatProgressSpinner],
  templateUrl: './remove.component.html',
  styleUrl: './remove.component.scss',
})
export class RemoveComponent implements OnInit {
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<RemoveComponent>,
    private supplyService: SupplyService,
    private feedbackService: FeedbackService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      supply: ISupply;
    }
  ) {}

  ngOnInit(): void {}

  remove(): void {
    this.isLoading = true;
    this.supplyService.delete(this.data.supply.id).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialogRef.close({ success: true });
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.feedbackService.error(err);
      },
    });
  }

  close(): void {
    this.dialogRef.close({ success: false });
  }
}
