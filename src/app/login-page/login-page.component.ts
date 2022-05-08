import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';

interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginForm: FormGroup;
  //TODO: Add authentication
  //private token: string;
  categories: Category[] = [
    { value: 'food', viewValue: 'Food' },
    { value: 'animals', viewValue: 'Animals' },
    { value: 'musicInstruments', viewValue: 'Music Instruments' },
    { value: 'flowers', viewValue: 'Flowers' },
    { value: 'logos', viewValue: 'Logos' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
      ]),
      category: new FormControl(null, Validators.required),
    });
  }

  onSubmit(user: User) {
    if (this.loginForm.invalid) {
      return;
    }

    console.log(user);
    // this.router.navigate(['home-page']);

    //TODO: Add authentication later
    //this.authService.logIn(user).subscribe(
    //   (response) => {
    //     sessionStorage.setItem('authorization', response.body);
    //     this.location.replaceState('/');
    //     this.router.navigate(['self-service-page']);
    //   },
    //   (error) => {
    //     console.log(error.status);
    //   }
    //);
  }
}
