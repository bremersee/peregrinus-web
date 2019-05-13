import {Component} from '@angular/core';
import {AuthConfig, JwksValidationHandler, OAuthErrorEvent, OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';

export const authConfig: AuthConfig = {
  issuer: 'https://openid.dev.bremersee.org/auth/realms/omnia',
  redirectUri: window.location.origin,
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

  constructor(private oauthService: OAuthService, private router: Router) {
    oauthService.configure(authConfig);
    oauthService.tokenValidationHandler = new JwksValidationHandler();
    oauthService.events.subscribe(e => e instanceof OAuthErrorEvent ? console.error(e) : console.warn(e));

    // Load Discovery Document and then try to login the user
    oauthService.loadDiscoveryDocument()
    // See if the hash fragment contains tokens (when user got redirected back)
    .then(() => oauthService.tryLogin({
      onTokenReceived: (info) => {
        console.warn('path: |' +  info.state + '|');
        if (info.state && info.state.trim() !== '') {
          const path = info.state.trim();
          if (info.state.trim().startsWith('/')) {
            router.navigate(['' + path]);
          } else {
            router.navigate(['/' + path]);
          }
        } else {
          router.navigate(['/workbench']);
        }
      },
      onLoginError: (anyObj) => {
        console.error('response: ', anyObj);
      }
    }))
    // If we're still not logged in yet, try with a silent refresh:
    .then(() => {
      if (!oauthService.hasValidAccessToken()) {
        return oauthService.silentRefresh();
      }
    });

    oauthService.setupAutomaticSilentRefresh();
  }
}
