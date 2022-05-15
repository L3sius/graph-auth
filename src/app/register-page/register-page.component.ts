import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterContent } from '../models/RegisterContent';

interface Category {
  value: string;
  viewValue: string;
  isEnabled: boolean;
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
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
    return this.registerForm.controls.images as FormArray;
  }

  selectedType = '';
  password = new Array();

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
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      category: new FormControl(null, Validators.required),
      images: new FormArray([]),
    });
  }

  onSelectChange(event: any) {
    this.selectedType = event.value;
    this.unCheckAll();
  }

  unCheckAll() {
    this.password.length = 0;
    this.removeCheckboxes();
    this.addCheckboxes();
  }

  onCheckboxChange(id: any, event: any) {
    this.updateBorderColor(id, event.target.checked);
    this.updatePasswordArray(id, event.target.checked);
  }

  private addCheckboxes() {
    this.foodData.forEach(() =>
      this.imagesFormArray.push(new FormControl(false))
    );
  }

  private removeCheckboxes() {
    this.foodData.forEach(() => this.imagesFormArray.clear());
  }

  updateBorderColor(element: string, isChecked: boolean) {
    var selectedImage = document.getElementById(element);
    if (isChecked) {
      selectedImage.style.border = '3px solid #00adb5';
    } else {
      selectedImage.style.border = '3px solid black';
    }
  }

  updatePasswordArray(element: number, isChecked: boolean) {
    if (isChecked) {
      this.password.push(element);
    } else {
      const index = this.password.indexOf(element, 0);
      if (index > -1) {
        this.password.splice(index, 1);
      }
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    var name = this.registerForm.get('name').value;
    var surname = this.registerForm.get('surname').value;
    var email = this.registerForm.get('email').value;
    var category = this.registerForm.get('category').value;
    var password = this.password.toString().replace(/,/g, '');

    var registerContent: RegisterContent = {
      name,
      surname,
      email,
      category,
      password,
    };

    console.log(registerContent);

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
