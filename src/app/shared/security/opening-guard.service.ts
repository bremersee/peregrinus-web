import {Injectable} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OpeningGuardService implements CanActivate {

  constructor(private oauthService: OAuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.oauthService.hasValidIdToken()) {
      //this.router.navigate(['/workbench']);
      return false;
    }
    return true;
  }

}
