import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwofactorActivationPageComponent } from './twofactor-activation-page.component';

describe('TwofactorActivationPageComponent', () => {
  let component: TwofactorActivationPageComponent;
  let fixture: ComponentFixture<TwofactorActivationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwofactorActivationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwofactorActivationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
