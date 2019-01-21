import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchUsersFormComponent } from './search-users-form/search-users-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SearchUsersService} from './services/search-users.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchUsersFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    SearchUsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
