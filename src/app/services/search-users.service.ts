import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {IResponse} from './IResponse';

@Injectable({
  providedIn: 'root'
})
export class SearchUsersService {

  constructor(private http: HttpClient) { }

  searchUsers(searchTerm: string, itemsPerPage?: number, page?: number): Observable<IResponse> {
    searchTerm = searchTerm.trim();
    let httpParams = new HttpParams();
    httpParams = httpParams.append('q', searchTerm);
    if (itemsPerPage) {
      httpParams = httpParams.append('per_page', itemsPerPage.toString());
    }
    if (page) {
      httpParams = httpParams.append('page', page.toString());
    }
    const options = {
      params: httpParams
    };
    return <Observable<IResponse>>this.http.get(`${environment.apiUrl}/search/users`, options);
  }
}
