import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ContentComponent } from './content/content.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { ResetComponent } from './auth/reset/reset.component';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  { path: 'content', component: ContentComponent, canActivate: [AuthGuard] },
  { path: 'reset', component: ResetComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'content', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
