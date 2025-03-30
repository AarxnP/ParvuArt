import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private Firestore: Firestore, private AuthService: AuthService) { }

  async loadUserInFirebase() {
    const user = this.AuthService.getCurrentUser();
    if (!user) return;
    const userRef = doc(this.Firestore, "users", user.uid);
    const userData = getDoc(userRef);
    if(await userData.then(doc => doc.exists())) return;
    setDoc(userRef, {
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
      role: "user"
    });
  }

  getCurrentUser(){
    const user = this.AuthService.getCurrentUser();
    if (!user) return null;
    const userRef = doc(this.Firestore, "users", user.uid);
    return getDoc(userRef).then(doc => doc.data());
  }
}
