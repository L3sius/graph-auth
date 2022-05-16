import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../shared/services/database.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { browserRefresh } from '../app.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private databaseService: DatabaseService,
    public authService: AuthService,
    private router: Router
  ) {}

  user: any;
  userId: any;
  allUsers: any;
  currentUserAuthenticatorStatus: any;
  public browserRefresh: boolean;

  ngOnInit(): void {
    if (browserRefresh) {
      this.user = JSON.parse(localStorage.getItem('user')!);
    } else {
      this.user = this.authService.userData;
    }
    this.getUsers();
  }

  async getUsers() {
    this.allUsers = await this.databaseService.getAllUsers();
    this.user = this.authService.userData;

    if (
      this.allUsers.find((obj: any) => obj.id === this.user.uid).twoFactorStatus
    ) {
      this.currentUserAuthenticatorStatus = true;
    } else {
      this.currentUserAuthenticatorStatus = false;
    }
  }

  changeTwoFactorStatus(status: boolean) {
    console.log('status came ' + status);
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.databaseService.updateTwoFactorAuthenticationStatus(
      this.user.uid,
      status
    );
    if (status) {
      window.alert(`Two factor authentication was enabled.`);
    } else {
      window.alert(`Two factor authentication was disabled.`);
    }
    this.getUsers();
  }
}
