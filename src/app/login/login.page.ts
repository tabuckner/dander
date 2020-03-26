import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../core/services/firebase-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private firebaseAuth: FirebaseAuthService) { }

  ngOnInit() {
  }

  public onGoogleAuth() {
    this.firebaseAuth.googleAuth();
  }

}
