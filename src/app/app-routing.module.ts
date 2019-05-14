import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OpeningComponent} from './opening/opening.component';
import {BasecampComponent} from './basecamp/basecamp.component';
import {BasecampGuardService} from './shared/security/basecamp-guard.service';

const routes: Routes = [
  {path: 'basecamp', component: BasecampComponent, canActivate: [BasecampGuardService]},
  {path: 'opening', component: OpeningComponent},
  {path: '', redirectTo: 'opening', pathMatch: 'full'},
  {path: '**', redirectTo: 'opening'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
