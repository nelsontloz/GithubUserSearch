import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchUsersService {

  constructor(private http: HttpClient) { }

  searchUsers(searchTerm: string, itemsPerPage?: number, page?: number) {
    searchTerm = searchTerm.trim();
    const httpParams = new HttpParams().set('q', searchTerm);
    if (itemsPerPage) {
      httpParams.set('per_page', itemsPerPage.toString());
    }
    if (page) {
      httpParams.set('page', page.toString());
    }
    const options = {
      params: httpParams
    };
    return this.http.get(`${environment.apiUrl}/search/users`, options);
  }
}
