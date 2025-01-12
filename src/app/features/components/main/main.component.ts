import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { SupplyService } from '../../services/supply.service';
import { ISupply, ISupplyResponse } from '../../models/supply.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RemoveComponent } from '../modals/remove/remove.component';
import { ToolbarComponent } from '../../../shared/toolbar/toolbar.component';
import { debounceTime } from 'rxjs';
import { RouterLink } from '@angular/router';
import { FeedbackService } from '../../../shared/services/feedback.service';

@Component({
  selector: 'app-main',
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ToolbarComponent,
    RouterLink,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'mileage',
    'plate',
    'createdAt',
    'total',
    'actions',
  ];
  supplys: ISupply[] = [];
  pageable?: ISupplyResponse;
  isLoading: boolean = true;
  isHidePageSize: boolean = false;
  total: number = 0;
  oldQuerySearch: string = '';
  searchControl = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private supplyService: SupplyService,
    private feedbackService: FeedbackService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getSupplys().then();

    this.searchControl.valueChanges
      .pipe(debounceTime(400))
      .subscribe((search) => {
        console.log(search);
        if (this.oldQuerySearch !== search) {
          this.oldQuerySearch = search!;
          this.getSupplys(search!);
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  async getSupplys(search?: string): Promise<void> {
    this.isLoading = true;

    const page = this.paginator?.pageIndex;
    const limit = this.paginator?.pageSize;
    const direction = this.sort?.direction.toLocaleUpperCase();

    this.supplyService.fetchAll(page, limit, search).subscribe({
      next: (res) => {
        this.pageable = res;
        this.isHidePageSize = this.pageable!.content.length > 0 ? false : true;
        this.supplys = res.content;
        this.total = this.pageable!.totalElements ?? 0;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.feedbackService.httpError(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  remove(supply: ISupply): void {
    const dialogRef = this.dialog.open(RemoveComponent, {
      panelClass: 'dialog-br-12',
      data: {
        supply: supply,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res?.success) {
        this.feedbackService.show('Processo realizado com sucesso.');
        this.getSupplys().then();
      }
    });
  }

  paginatorChange(event: PageEvent): void {
    this.getSupplys();
  }

  get dataSource(): MatTableDataSource<ISupply> {
    return new MatTableDataSource(this.supplys);
  }
}
