import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from './user';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;
  allUsers: any;
  currentUserAuthenticatorStatus: any;
  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public analytics: AngularFireAnalytics,
    private databaseService: DatabaseService
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  async getUsers() {
    //TODO Get one user
    // console.log(await this.databaseService.getUserById(this.user.uid));
    this.allUsers = await this.databaseService.getAllUsers();
    console.log(this.allUsers);
    console.log(this.user);
    if (
      this.allUsers.find((obj: any) => obj.id === this.user.uid).twoFactorStatus
    ) {
      console.log('I came here');
      this.currentUserAuthenticatorStatus = true;
    } else {
      this.currentUserAuthenticatorStatus = false;
    }
    console.log(this.currentUserAuthenticatorStatus);
  }

  getUserfromLocalStorage() {
    return JSON.parse(localStorage.getItem('user')!);
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.analytics.logEvent('SignIn', { value: 'Successful' });
        this.SetUserData(result.user).then(() => {
          this.user = this.getUserfromLocalStorage();
          this.getUsers().then(() => {
            this.ngZone.run(() => {
              console.log(
                'auth status is ' + this.currentUserAuthenticatorStatus
              );
              if (this.currentUserAuthenticatorStatus) {
                this.router.navigate(['activation-page']);
              } else {
                this.router.navigate(['home-page']);
              }
            });
          });
        });
      })
      .catch((error) => {
        if (error.code == 'auth/wrong-password') {
          window.alert('Incorrect username and/or password. Please try again.');
          this.analytics.logEvent('SignIn', {
            value: 'Unsuccessful/wrong-password',
          });
        } else if (error.code == 'auth/user-not-found') {
          window.alert('Incorrect username and/or password. Please try again.');
          this.analytics.logEvent('SignIn', {
            value: 'Unsuccessful/user-not-found',
          });
        } else {
          window.alert(error.message);
          this.analytics.logEvent('SignIn', {
            value: 'Unsuccessful/other',
          });
        }
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);

        window.alert('Account created succesfully, you can login now.');
        this.ngZone.run(() => {
          this.router.navigate(['login-page']);
        });
        this.analytics.logEvent('SignUp', { value: 'Successful' });
        this.databaseService.addNewUser(
          result.user.uid,
          result.user.email,
          false
        );
      })
      .catch((error) => {
        if (error.code == 'auth/email-already-in-use') {
          window.alert('Email is already in use. Login or use another one.');
        } else {
          window.alert(error.message);
        }
        this.analytics.logEvent('SignUp', { value: 'Unsuccessful' });
      });
  }

  // Returns true when user is logged in
  get isLoggedIn(): boolean {
    // const user = JSON.parse(localStorage.getItem('user')!);
    return this.user !== null ? true : false;
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login-page']);
    });
  }

  logEvents(eventName: string): void {
    // shared method to log the events
    this.analytics.logEvent(eventName);
  }
}
