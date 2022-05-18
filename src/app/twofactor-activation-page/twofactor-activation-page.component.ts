import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import 'src/assets/smtp.js';
import { Router } from '@angular/router';

declare let Email: any;

@Component({
  selector: 'app-twofactor-activation-page',
  templateUrl: './twofactor-activation-page.component.html',
  styleUrls: ['./twofactor-activation-page.component.css'],
})
export class TwofactorActivationPageComponent implements OnInit {
  activationForm: FormGroup;
  user: any;
  token: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.activationForm = new FormGroup({
      code: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern('^[0-9]*$'),
      ]),
    });

    this.user = JSON.parse(localStorage.getItem('user')!);

    this.token = this.getRandomNumberBetween(100000, 999999);
    Email.send({
      Host: 'smtp.elasticemail.com',
      Username: 'testgraph@gmail.com',
      Password: '915CFC2BF129A5B72FF149724A8C003D7A3D',
      To: `${this.user.email}`,
      From: `justaslescinskas@gmail.com`,
      Subject: 'Authentication code',
      Body: `
    <i>Your authentication code is below, please input it to finish your login.</i> <br/> <b>Token: </b> ${this.token} <br />`,
    }).then((message: any) => {
      console.log(message);
    });
  }

  getRandomNumberBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  }

  async onSubmit() {
    if (this.activationForm.invalid) {
      return;
    }

    if (this.activationForm.get('code').value === this.token) {
      alert('Correct code, you are being logged in.');
      this.router.navigate(['home-page']);
    } else {
      alert('Incorrect code, aborting login');
      this.router.navigate(['login-page']);
    }
  }
}
