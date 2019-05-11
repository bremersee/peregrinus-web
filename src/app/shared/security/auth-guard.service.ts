import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private oauthService: OAuthService, private router: Router) {
  }

//  canActivate(
//    route: ActivatedRouteSnapshot,
//    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//    return undefined;
//  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.oauthService.hasValidIdToken()) {
      return true;
    }

    this.router.navigate(['/opening']);
    return false;
  }

}
