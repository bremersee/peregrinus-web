import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';import {OAuthModule} from 'angular-oauth2-oidc';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AuthComponent} from './header/auth/auth.component';
import {OpeningComponent} from './opening/opening.component';
import {BasecampComponent} from './basecamp/basecamp.component';
import {TreeComponent} from './basecamp/tree/tree.component';
import { BasecampRedirectComponent } from './basecamp-redirect/basecamp-redirect.component';
import { NodeIconComponent } from './basecamp/tree/node-icon/node-icon.component';
import { MapComponent } from './basecamp/map/map.component';
import { NodeMenuComponent } from './basecamp/tree/node-menu/node-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    OpeningComponent,
    BasecampComponent,
    TreeComponent,
    BasecampRedirectComponent,
    NodeIconComponent,
    MapComponent,
    NodeMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
    NgbModule,
    FontAwesomeModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['https://api.dev.bremersee.org'],
        sendAccessToken: true
      }
    }),
    LeafletModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    library.add(fas, far);
  }

}
