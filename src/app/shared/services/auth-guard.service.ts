import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';

import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {

    if(this.userService.authenticateUser(environment.check_auth, {
      'userId':window.localStorage.userId,
      'token':window.localStorage.token
      })) {
        return true;
      } else {
        return false;
    } 
  }
}
