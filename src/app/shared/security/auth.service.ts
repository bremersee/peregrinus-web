import {Injectable} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthService: OAuthService) {
  }

  login(path?: string): void {
    this.oauthService.initImplicitFlow(path);
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }
}
