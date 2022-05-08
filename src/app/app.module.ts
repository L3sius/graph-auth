import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSliderModule } from '@angular/material/slider';
import { LoginPageComponent } from './login-page/login-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LandingPageComponent,
    RegisterPageComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatBadgeModule,
  ],
  exports: [MatButtonModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
