import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

// c3c75ce9886ea8418f42e933b5829ad4a360a59f

export class AuthService {
  private accessToken: string;

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  getAccessToken(): string {
    return this.accessToken;
  }
}
