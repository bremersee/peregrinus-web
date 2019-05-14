import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-basecamp-redirect',
  template: '<div></div>',
  styles: []
})
export class BasecampRedirectComponent implements OnInit {

  constructor(private oauthService: OAuthService) {
  }

  ngOnInit(): void {
    this.oauthService.silentRefresh().then(() => {
      console.warn('Basecamp redirect component executed silent refresh.');
    });
  }

}
