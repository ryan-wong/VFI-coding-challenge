import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  resetForm: FormGroup;
  resetSuccess: Boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm () {
    this.resetForm = new FormGroup({
      password: new FormControl('', [Validators.minLength(6)]),
    });
  }

  onReset() {
    const password = this.resetForm.value.password;
    this.authService.reset(password).then((res) => {
      this.resetSuccess = true;
      alert('Password Changed');
    }).catch((error) => {
      alert(error);
    });
  }

  get password() {
    return this.resetForm.get('password');
  }

}
