import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MarcheAPIService {
    constructor(
        private httpClient: HttpClient,
        private authenticationService: AuthenticationService
    ) {}

    getRequest<T>(endpoint: string, filters: string): Observable<T> {
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization:
                    'Bearer ' + this.authenticationService.getAuthToken(),
            }),
            params: {
                f: filters,
            },
        };
        return this.httpClient.get<T>(
            `${environment.HOST}${endpoint}`,
            httpOptions
        );
    }
}
