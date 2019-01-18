import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SearchUsersService} from '../search-users.service';
import {debounce, debounceTime, map} from 'rxjs/operators';

@Component({
  selector: 'app-search-users-form',
  templateUrl: './search-users-form.component.html',
  styleUrls: ['./search-users-form.component.scss']
})
export class SearchUsersFormComponent implements OnInit {

  searchForm: FormGroup;

  constructor(private searchUsersService: SearchUsersService) {
    this.searchForm = new FormGroup({
      input: new FormControl('', [
        Validators.required, Validators.minLength(3)
      ])
    });
  }

  ngOnInit() {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(400),
        map(data => data.input)
      )
      .subscribe((input) => {
        console.log(input);
      });
  }

  onSubmit() {
    const input = this.searchForm.value.input;
    this.searchUsersService.searchUsers(input).subscribe((response) => {
      console.log(response);
    });
  }

}
