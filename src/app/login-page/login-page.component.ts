import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';

interface Category {
  value: string;
  viewValue: string;
  isEnabled: boolean;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginForm: FormGroup;
  @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef>;
  foodData = [
    {
      id: 1,
      url: 'https://res.cloudinary.com/dajxgd8au/image/upload/c_scale,h_200,w_200/v1652451277/food/food1_ubiq8s.jpg',
    },
    {
      id: 2,
      url: 'https://res.cloudinary.com/dajxgd8au/image/upload/c_scale,h_200,w_200/v1652451276/food/food2_lgrcwa.jpg',
    },
    {
      id: 3,
      url: 'https://res.cloudinary.com/dajxgd8au/image/upload/c_scale,h_200,w_200/v1652451276/food/food3_blgryb.jpg',
    },
    {
      id: 4,
      url: 'https://res.cloudinary.com/dajxgd8au/image/upload/c_scale,h_200,w_200/v1652451277/food/food4_zuyb3s.jpg',
    },
    {
      id: 5,
      url: 'https://res.cloudinary.com/dajxgd8au/image/upload/c_scale,h_200,w_200/v1652451277/food/food5_shun2m.jpg',
    },
    {
      id: 6,
      url: 'https://res.cloudinary.com/dajxgd8au/image/upload/c_scale,h_200,w_200/v1652451277/food/food6_r76jpx.jpg',
    },
    {
      id: 7,
      url: 'https://res.cloudinary.com/dajxgd8au/image/upload/c_scale,h_200,w_200/v1652451278/food/food7_ogxwu0.jpg',
    },
    {
      id: 8,
      url: 'https://res.cloudinary.com/dajxgd8au/image/upload/c_scale,h_200,w_200/v1652451277/food/food8_tj8oo9.jpg',
    },
    {
      id: 9,
      url: 'https://res.cloudinary.com/dajxgd8au/image/upload/c_scale,h_200,w_200/v1652451277/food/food9_xkqddv.jpg',
    },
    {
      id: 10,
      url: 'https://res.cloudinary.com/dajxgd8au/image/upload/c_scale,h_200,w_200/v1652451278/food/food10_mmbrrw.jpg',
    },
  ];

  animalsData = [
    {
      id: 1,
      url: 'https://res.cloudinary.com/dajxgd8au/image/upload/c_scale,h_200,w_200/v1652536152/animals/animals1_nysfx6.jpg',
    },
    {
      id: 2,
      url: 'https://res.cloudinary.com/dajxgd8au/image/upload/c_scale,h_200,w_200/v1652536152/animals/animals2_ogym7l.jpg',
    },
    {
      id: 3,
      url: 'https://res.cloudinary.com/dajxgd8au/image/upload/c_scale,h_200,w_200/v1652536152/animals/animals3_tesj2m.jpg',
    },
    {
      id: 4,
      url: 'https://res.cloudinary.com/dajxgd8au/image/upload/c_scale,h_200,w_200/v1652536152/animals/animals4_suqt9e.jpg',
    },
    {
      id: 5,
      url: 'https://res.cloudinary.com/dajxgd8au/image/upload/c_scale,h_200,w_200/v1652536153/animals/animals5_xexvqt.jpg',
    },
    {
      id: 6,
      url: 'https://res.cloudinary.com/dajxgd8au/image/upload/c_scale,h_200,w_200/v1652536152/animals/animals6_eixgce.jpg',
    },
    {
      id: 7,
      url: 'https://res.cloudinary.com/dajxgd8au/image/upload/c_scale,h_200,w_200/v1652536213/animals/animals7_rrbteo.jpg',
    },
    {
      id: 8,
      url: 'https://res.cloudinary.com/dajxgd8au/image/upload/c_scale,h_200,w_200/v1652536153/animals/animals8_ac9i89.jpg',
    },
    {
      id: 9,
      url: 'https://res.cloudinary.com/dajxgd8au/image/upload/c_scale,h_200,w_200/v1652536153/animals/animals9_dozkp3.jpg',
    },
    {
      id: 10,
      url: 'https://res.cloudinary.com/dajxgd8au/image/upload/c_scale,h_200,w_200/v1652536153/animals/animals10_vjp1fu.jpg',
    },
  ];

  get imagesFormArray() {
    return this.loginForm.controls.images as FormArray;
  }

  selectedType = '';
  password = new Array();

  test = new Array(10);

  //TODO: Add authentication
  //private token: string;
  categories: Category[] = [
    { value: 'food', viewValue: 'Food', isEnabled: true },
    { value: 'animals', viewValue: 'Animals', isEnabled: true },
    {
      value: 'musicInstruments',
      viewValue: 'Music Instruments',
      isEnabled: false,
    },
    { value: 'flowers', viewValue: 'Flowers', isEnabled: false },
    { value: 'logos', viewValue: 'Logos', isEnabled: false },
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
      images: new FormArray([]),
    });

    this.addCheckboxes();
  }

  onSelectChange(event: any) {
    this.selectedType = event.value;
    this.unCheckAll();
  }

  unCheckAll() {
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
      this.password.length = 0;
    });
  }

  onCheckboxChange(id: any, event: any) {
    console.log(event);
    console.log(id);
    // console.log(event.srcElement.id);
    console.log(event.target.checked);

    this.updatePasswordArray(id, event.target.checked);
  }

  private addCheckboxes() {
    this.foodData.forEach(() =>
      this.imagesFormArray.push(new FormControl(false))
    );
    // this.animalsData.forEach(() =>
    //   this.animalsFormArray.push(new FormControl(false))
    // );
  }

  updatePasswordArray(element: number, isChecked: boolean) {
    console.log(element);
    if (isChecked) {
      this.password.push(element);
      console.log(this.password);
    } else {
      const index = this.password.indexOf(element, 0);
      if (index > -1) {
        this.password.splice(index, 1);
        console.log(this.password);
      }
    }
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