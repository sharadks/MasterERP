import {Injectable} from '@angular/core';



@Injectable()
export class JwtService {

    getToken(): String {
        return window.localStorage['jwtToken'];
    }

    saveToken(token: String) {
        window.localStorage['jwtToken'] = token;
    }

    destroyToken() {
        window.localStorage.clear();
    }

    setCurrentUser(User) {
        window.localStorage['landingPage'] = User.landingPage;
        localStorage.setItem('dashboards', JSON.stringify(User.dashboards));
    }

    getCurrentUser() {
        return window.localStorage;
    }

}
