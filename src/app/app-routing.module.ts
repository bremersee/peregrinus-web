import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OpeningComponent} from './opening/opening.component';
import {WorkbenchComponent} from './workbench/workbench.component';
import {AuthGuardService} from './shared/security/auth-guard.service';

const routes: Routes = [
  {path: 'workbench', component: WorkbenchComponent, canActivate: [AuthGuardService]},
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
