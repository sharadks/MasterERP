import {Component, OnChanges, OnInit} from '@angular/core';
import { UserService } from './shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements  OnInit, OnChanges {
  currentUser: any;
  constructor (private userService: UserService, private router:Router) {
  }

  ngOnInit() {
    //this.userService.populate();
    //this.currentUser = this.userService.getCurrentUser();
    // this.router.navigateByUrl('/' + this.currentUser.landingPage);

  }
  ngOnChanges() {
   // this.userService.populate();
  }
}
