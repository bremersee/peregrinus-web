import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class BasecampGuardService implements CanActivate {

  constructor(private oauthService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.oauthService.isLoggedIn()) {
      return true;
    }
    // wahrscheinlich wird das zweimal aufgerufen
    // this.oauthService.login('/basecamp'); // invalid nonce/state
    this.router.navigate(['/opening']);
    return false;
  }

}
