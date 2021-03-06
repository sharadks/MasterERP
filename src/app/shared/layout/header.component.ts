import {Component, OnInit} from '@angular/core';
import {User} from '../models';
import {UserService} from '../services';
import {Router} from '@angular/router';


@Component({
    selector: 'layout-header',
    templateUrl: './header.component.html',
      styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
    currentUser: any;
    isLoggedIn: boolean = false;


    constructor(private userService: UserService,
                private router: Router) {


    }


    ngOnInit() {
        this.userService.currentUser.subscribe(
            (userData) => {
                this.currentUser = userData;
            }
        )
    }

     getUserName(): string {
        return localStorage.getItem('userName');
    }

    logout() {
        this.userService.purgeAuth();
        this.router.navigateByUrl('/');
    }
}
