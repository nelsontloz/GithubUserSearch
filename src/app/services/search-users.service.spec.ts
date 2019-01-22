import { TestBed } from '@angular/core/testing';

import { SearchUsersService } from './search-users.service';
import {HttpClient} from '@angular/common/http';

class MockHttpClient {}

describe('SearchUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient, useClass: MockHttpClient }
    ]
  }));

  it('should be created', () => {
    const service: SearchUsersService = TestBed.get(SearchUsersService);
    expect(service).toBeTruthy();
  });
});
