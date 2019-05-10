import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private oauthService: OAuthService) {
  }

  ngOnInit() {
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get userId() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['sub'];
  }

  get preferredUserName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['preferred_username'];
  }
}
