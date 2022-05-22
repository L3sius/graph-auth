import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { TwofactorActivationPageComponent } from './twofactor-activation-page/twofactor-activation-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'register-page', component: RegisterPageComponent },
  {
    path: 'home-page',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'activation-page',
    component: TwofactorActivationPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
