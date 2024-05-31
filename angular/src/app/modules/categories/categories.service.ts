import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface Category {
  code: string;
  label: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  async getAllCategories(): Promise<Category[]> {
    return await firstValueFrom(this.http.get<Category[]>('/api/categories'));
  }
}
