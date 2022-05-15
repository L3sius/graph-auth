import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-twofactor-activation-page',
  templateUrl: './twofactor-activation-page.component.html',
  styleUrls: ['./twofactor-activation-page.component.css'],
})
export class TwofactorActivationPageComponent implements OnInit {
  activationForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    //TODO: OnInit start two factor activation process
    this.activationForm = new FormGroup({
      code: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  onSubmit() {
    if (this.activationForm.invalid) {
      return;
    }

    console.log(this.activationForm.get('code').value);

    // this.router.navigate(['home-page']);
  }
}
