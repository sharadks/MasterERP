import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors, UserService } from '../shared';

@Component({
  selector: 'auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  errors: Errors = new Errors();
  isSubmitting = false;
  authForm: FormGroup;
  showOtp: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'otp':['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
      }
    });
  }


  getOTP() {
    this.errors = new Errors();
    const credentials = this.authForm.value;
    this.userService.getOTP({'login_id': credentials.email,'password':credentials.password}).subscribe(
      data => {
        this.showOtp = true;
      },
      err => {
        this.errors = err;
      }
    );
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = new Errors();
    const credentials = this.authForm.value;
    this.userService
    .attemptAuth(this.authType, {'grant_type ': credentials.password,'username': credentials.email,'password': credentials.otp})
    .subscribe(
      data => this.router.navigateByUrl('/' + this.userService.getCurrentUser().landingPage),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
    this.router.navigateByUrl('/certified-report')
  }
}
