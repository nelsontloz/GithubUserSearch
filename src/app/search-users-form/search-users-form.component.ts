import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SearchUsersService} from '../services/search-users.service';
import {debounceTime, filter, map, skipUntil, skipWhile, takeUntil, takeWhile} from 'rxjs/operators';
import {flatMap} from 'rxjs/internal/operators';
import {Observable, Subject} from 'rxjs';
import {IResponse} from '../services/IResponse';
import {IUser} from '../services/IUser';

@Component({
  selector: 'app-search-users-form',
  templateUrl: './search-users-form.component.html',
  styleUrls: ['./search-users-form.component.scss']
})
export class SearchUsersFormComponent implements OnInit {

  searchForm: FormGroup;
  foundUsers: Observable<IUser[]>;
  showList = false;

  private listIsBeenClicked = false;

  constructor(private searchUsersService: SearchUsersService) {
    this.searchForm = new FormGroup({
      input: new FormControl('', [
        Validators.required, Validators.minLength(3)
      ])
    });
  }

  ngOnInit() {
    const debouncedForm = this.searchForm.valueChanges
      .pipe(
        debounceTime(400),
        filter((data) => {
          // not emitting values when form is invalid (les than 3 characters)
          return this.searchForm.valid;
        })
      );

    this.foundUsers = debouncedForm.pipe(
      flatMap((data) => {
        return this.searchUsersService.searchUsers(data.input, 10);
      }),
      map((response: IResponse) => {
        this.showList = true;
        return <IUser[]>response.items;
      })
    );
  }

  onSubmit() {
  }

  onInputBlur() {
    this.showList = this.listIsBeenClicked;
  }

  onUserSelected(selectedUser: IUser) {
    console.log(selectedUser);
  }

  onItemMouseDown() {
    this.listIsBeenClicked = true;
  }

  onItemMouseUp() {
    this.listIsBeenClicked = false;
  }

}
