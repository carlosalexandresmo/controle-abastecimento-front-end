import { Pageable, Sort } from './pageable.model';

export interface ISupplyResponse {
  content: ISupply[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  sort: Sort;
  size: number;
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
}

export interface ISupply {
  id: number;
  mileage: number;
  plate: string;
  createdAt: string;
  total: number;
}

export class SupplyBody {
  mileage?: number;
  plate?: string;
  total?: number;
}
