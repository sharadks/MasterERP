import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout.component';
import { RouterModule } from '@angular/router';
import { AuthGuard, SharedModule } from '../shared';


const logoutRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'logout',
    component: LogoutComponent
  }
]);
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    logoutRouting
  ],
  declarations: [LogoutComponent]
})
export class LogoutModule { }
