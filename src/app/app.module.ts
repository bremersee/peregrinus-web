import { BrowserModule } from '@angular/platform-browser';
import {DoBootstrap, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './header/auth/auth.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {AppAuthGuard} from './app.authguard';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {MenubarModule} from 'primeng/menubar';
import {SharedModule} from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RippleModule} from 'primeng/ripple';
import {ButtonModule} from 'primeng/button';
import {MenuModule} from 'primeng/menu';
import {TreeModule} from 'primeng/tree';

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule,
    LeafletModule,
    SharedModule,
    MenuModule,
    MenubarModule,
    RippleModule,
    ButtonModule,
    TreeModule
  ],
  providers: [
    {
      provide: KeycloakService,
      useValue: keycloakService
    },
    AppAuthGuard
  ],
  entryComponents: [AppComponent]
})
export class AppModule implements DoBootstrap {

  constructor() {
  }

  async ngDoBootstrap(app) {
    try {
      await keycloakService.init({
        config: window.location.origin + environment.keycloakConfigLocation,
        initOptions: {
          flow: 'standard',
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: window.location.origin + environment.silentCheckSsoLocation,
          pkceMethod: 'S256'
        }
      });
      app.bootstrap(AppComponent);
    } catch (error) {
      console.error('Keycloak init failed', error);
    }
  }
}
