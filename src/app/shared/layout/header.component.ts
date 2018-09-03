import {Component, OnInit} from '@angular/core';

import {User} from '../models';
import {UserService} from '../services';
import {Router} from '@angular/router';


@Component({
    selector: 'layout-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
    currentUser: User;

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

    logout() {
        this.userService.purgeAuth();
        this.router.navigateByUrl('/');
    }
}
