import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUsersFormComponent } from './search-users-form.component';
import {AuthService} from '../services/auth.service';
import {SearchUsersService} from '../services/search-users.service';

class MockSearchUsersService {}
class MockAuthService {}

describe('SearchUsersFormComponent', () => {
  let component: SearchUsersFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchUsersFormComponent,
        { provide: SearchUsersService, useClass: MockSearchUsersService },
        { provide: AuthService, useClass: MockAuthService }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    component = TestBed.get(SearchUsersFormComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
