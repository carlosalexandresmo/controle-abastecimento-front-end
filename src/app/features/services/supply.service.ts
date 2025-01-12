import { Injectable } from '@angular/core';
import { SupplyRepository } from '../repositories/supply.repository';
import { catchError, map, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ISupplyResponse, SupplyBody } from '../models/supply.model';
import { FeedbackService } from '../../shared/services/feedback.service';

@Injectable({
  providedIn: 'root',
})
export class SupplyService {
  constructor(
    private repository: SupplyRepository,
    private feedbackService: FeedbackService
  ) {}

  public fetchAll(
    page = 0,
    limit = 5,
    plate?: string
  ): Observable<ISupplyResponse> {
    return this.repository.findAll(page, limit, plate).pipe(
      map((res) => {
        return res;
      }),
      catchError((err: HttpErrorResponse) => {
        this.feedbackService.httpWarn(err);
        throw err;
      })
    );
  }

  public create(body: SupplyBody): Observable<any> {
    return this.repository.create(body).pipe(
      map((res) => {
        return res;
      }),
      catchError((err: HttpErrorResponse) => {
        this.feedbackService.httpWarn(err);
        throw err;
      })
    );
  }

  public delete(id: number): Observable<any> {
    return this.repository.delete(id).pipe(
      map((res) => {
        return res;
      }),
      catchError((err: HttpErrorResponse) => {
        this.feedbackService.httpWarn(err);
        throw err;
      })
    );
  }
}
