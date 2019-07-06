import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/content/content.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loginSuccess: boolean;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private contentService: ContentService) {
    this.loginSuccess = false;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm () {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onRegister() {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    this.authService.register(email, password).then((res) => {
      this.loginSuccess = true;
      this.contentService.saveContent(this.contentService.getInitialBlob(), [], this.authService.getUserId());
      this.router.navigate(['/content']);
    }).catch((error) => {
      alert(error);
    });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }
}
