import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from '../../core/endpoints';
import { ISupply, ISupplyResponse, SupplyBody } from '../models/supply.model';

@Injectable({
  providedIn: 'root',
})
export class SupplyRepository {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  findAll(page: number, limit: number, plate?: string): Observable<ISupplyResponse> {
    let params: HttpParams = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString());

    if (plate != null) {
      params = params.set('placa', plate.toLowerCase());
    }

    return this.http.get<ISupplyResponse>(
      `${this.baseUrl}` + Endpoints.abastecimentos,
      {
        params,
      }
    );
  }

  create(body: SupplyBody): Observable<ISupply> {
    return this.http.post<ISupply>(
      `${this.baseUrl}` + Endpoints.abastecimentos,
      body
    );
  }

  delete(id: number): Observable<ISupply> {
    return this.http.delete<ISupply>(
      `${this.baseUrl}` + Endpoints.abastecimentos + `/${id}`
    );
  }
}
