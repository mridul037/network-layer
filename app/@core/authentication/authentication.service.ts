import { Injectable, isDevMode } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    constructor() {}

    getAuthToken() {
        if (isDevMode()) {
            return 'let_me_through_coz_i_got_rights';
        } else {
            throw new Error(' Auth Not Implemented');
        }
    }
}
