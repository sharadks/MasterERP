import {Injectable} from '@angular/core';



@Injectable()
export class JwtService {

    getToken(): String {
        return window.localStorage['token'];
    }

    saveToken(token: String) {
        window.localStorage['token'] = token;
    }

    destroyToken() {
        window.localStorage.clear();
    }

    setCurrentUser(User) {
       // window.localStorage['brijUser']=JSON.stringify(User);
        localStorage.setItem('token', User.access_token);
        localStorage.setItem('userId',User.userId);
        localStorage.setItem('userName',User.userName);
        localStorage.setItem('token_type',User.token_type);
        localStorage.setItem('ReturnUrl', User.ReturnUrl);
    }

    getCurrentUser() {
        return window.localStorage;
    }

}
