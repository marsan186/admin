import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private _router: Router,private _auth:AuthService, private _http: HttpClient) { }

    getUser() {
        let token;

        if(this._auth.isAuthenticated()){
            const adminUser =JSON.parse(this._auth.isAuthenticated());
            token = adminUser.token ? adminUser.token:"";
        }
        const headerOption ={
            headers:new HttpHeaders({
                'Content-Type':'application/json',
                'authorization':token

            })
        }
        return this._http.get("/getusers",headerOption);
    }

}
