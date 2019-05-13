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
    this.oauthService.initImplicitFlow('/workbench');
    /*
    this.oauthService.tryLogin({
      onTokenReceived: (info) => {
        console.debug('state', info.state);
      }
    });
     */
    // https://openid.dev.bremersee.org/auth/realms/omnia/protocol/openid-connect/auth?response_type=id_token%20token&client_id=omnia&state=FqtvAChlAX71bq7JeEUrbyUhlyztTPA7c6cffQFq%3Bhttp%3A%2F%2Fwww.myurl.com%2Fx%2Fy%2Fz&redirect_uri=http%3A%2F%2Flocalhost%3A4200&scope=openid%20profile%20email&nonce=FqtvAChlAX71bq7JeEUrbyUhlyztTPA7c6cffQFq
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
