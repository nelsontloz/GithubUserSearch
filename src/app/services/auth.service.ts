import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private accessToken: string;

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  getAccessToken(): string {
    return this.accessToken;
  }
}
