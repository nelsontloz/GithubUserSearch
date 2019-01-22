import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchUsersService } from '../services/search-users.service';
import { catchError, debounceTime, filter, map, share } from 'rxjs/operators';
import { flatMap } from 'rxjs/internal/operators';
import { fromEvent, Observable, EMPTY } from 'rxjs';
import { IResponse } from '../interfaces/IResponse';
import { IUser } from '../interfaces/IUser';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-search-users-form',
  templateUrl: './search-users-form.component.html',
  styleUrls: ['./search-users-form.component.scss']
})
export class SearchUsersFormComponent implements OnInit {

  searchForm: FormGroup;
  foundUsers: Observable<IUser[]>;
  showList = false;
  selectedUser: IUser;

  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(private searchUsersService: SearchUsersService,
              private authService: AuthService) {
    this.searchForm = new FormGroup({
      input: new FormControl('', [
        Validators.required, Validators.minLength(3)
      ])
    });
  }

  ngOnInit() {
    const debouncedForm = fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        debounceTime(400),
        filter(() => {
          // not emitting values when form is invalid (less than 3 characters)
          return this.searchForm.valid;
        })
      );

    this.foundUsers = debouncedForm.pipe(
      flatMap((data) => {
        return this.searchUsersService.searchUsers(this.searchForm.controls['input'].value, 10).pipe(
          catchError((error: HttpErrorResponse) => {
            return EMPTY;
          })
        );
      }),
      map((response: IResponse) => {
        this.showList = true;
        return <IUser[]>response.items;
      }),
      share()
    );
  }

  onInputBlur() {
    this.showList = false;
  }

  onInputFocus() {
    this.showList = this.searchForm.valid;
  }

  onItemMouseDown(selectedUser: IUser) {
    this.showList = false;
    this.selectedUser = selectedUser;
    this.searchForm.controls['input'].setValue(selectedUser.login);
  }

  onAccessTokenInput(event) {
    this.authService.setAccessToken(event.target.value);
  }

}
