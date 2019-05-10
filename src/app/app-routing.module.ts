import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OpeningComponent} from './opening/opening.component';

const routes: Routes = [
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
