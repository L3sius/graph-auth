import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private db: AngularFirestore) {}

  getUserById(_id: string) {
    return new Promise<any>(() => {
      this.db.collection('UserAuthenticationStatus').doc(_id).get();
    });
  }

  getAllUsers() {
    return new Promise<any>((resolve) => {
      this.db
        .collection('UserAuthenticationStatus')
        .valueChanges({ idField: 'id' })
        .subscribe((users) => resolve(users));
    });
  }

  addNewUser(_newId: any, _userEmail: string, _twoFactorStatus: boolean) {
    this.db.collection('UserAuthenticationStatus').doc(_newId).set({
      userEmail: _userEmail,
      twoFactorStatus: _twoFactorStatus,
    });
  }

  updateTwoFactorAuthenticationStatus(_id: any, _twoFactorStatus: boolean) {
    this.db
      .collection('UserAuthenticationStatus')
      .doc(_id)
      .update({ twoFactorStatus: _twoFactorStatus });
  }
}
