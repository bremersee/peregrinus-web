import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OAuthModule} from 'angular-oauth2-oidc';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import { OpeningComponent } from './opening/opening.component';
import { AuthComponent } from './auth/auth.component';
import { WorkbenchComponent } from './workbench/workbench.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OpeningComponent,
    AuthComponent,
    WorkbenchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
