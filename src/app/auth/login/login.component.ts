import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginSuccess: boolean;
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.loginSuccess = false;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm () {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onLogin() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.authService.login(email, password).then((res) => {
      this.loginSuccess = true;
      this.router.navigate(['/content']);
    }).catch((error) => {
      alert(error);
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
