import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Errors, ReportService, JwtService } from '../shared';
import { environment } from '../../environments/environment';
import {UserService } from '../shared';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private isLoggedIn:boolean= false;
  private currentUser: any;
  constructor(
    private router: Router,
    private userService: UserService,
    private reportService: ReportService, 
    private jwtService: JwtService
  ) {

    this.currentUser = this.jwtService.getCurrentUser();
          var authData = {
          'userId':this.currentUser.userId,
          'token':this.currentUser.token
          };

    this.reportService.authenticateUser(environment.check_auth, authData).subscribe(
      data => {
        this.isLoggedIn= true;
      },
      err => {
        this.isLoggedIn= false;
        window.localStorage.clear();
        this.router.navigateByUrl('/login'); 
      }
    ); 


  }

  isAuthenticated: boolean;
  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

        // set the article list accordingly
        if (authenticated) {

        } else {

        }
      }
    );
  }

}
