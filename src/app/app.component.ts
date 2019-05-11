import { Component } from '@angular/core';
import {OAuthService, JwksValidationHandler, AuthConfig, OAuthErrorEvent} from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://openid.dev.bremersee.org/auth/realms/omnia',
  redirectUri: window.location.origin + '/index.html',
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  clientId: 'omnia',
  scope: 'openid profile email'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'peregrinus-web';

  constructor(private oauthService: OAuthService) {
    oauthService.configure(authConfig);
    oauthService.tokenValidationHandler = new JwksValidationHandler();
    oauthService.events.subscribe(e => e instanceof OAuthErrorEvent ? console.error(e) : console.warn(e));

    // Load Discovery Document and then try to login the user
    //this.oauthService.loadDiscoveryDocumentAndTryLogin();
    oauthService.loadDiscoveryDocument()

    // See if the hash fragment contains tokens (when user got redirected back)
    .then(() => oauthService.tryLogin({
      onTokenReceived: (info) => {
        console.warn('state', info.state);
      }
    }))

    // If we're still not logged in yet, try with a silent refresh:
    .then(() => {
      if (!oauthService.hasValidAccessToken()) {
        return oauthService.silentRefresh();
      }
    })

    // Get username, if possible.
    //.then(() => {
    //  if (oauthService.getIdentityClaims()) {
    //    this.username = oauthService.getIdentityClaims()['name'];
    //  }
    //})
    ;

    oauthService.setupAutomaticSilentRefresh();
  }
}
