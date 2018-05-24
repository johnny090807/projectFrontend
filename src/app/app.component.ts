import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {UserService} from './user/user.service';
import {AuthService} from './auth/auth.service';
import {Auth} from './auth/auth.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [UserService]
})
export class AppComponent implements OnInit {

    constructor(private authService: AuthService ) {}
    ngOnInit() {
            //Set the apiAdress for the requests to the server :)
        // localStorage.setItem('apiAddress', 'http://192.168.0.105:3000/api/');
        localStorage.setItem('apiAddress', 'http://localhost:3000/api/');
        // localStorage.setItem('apiAddress', 'http://54.93.235.238:3000/api/');
        // localStorage.setItem('apiAddress', 'http://mps.blancoblauw.nl:3000/api/');
            //set the user to check on admin
        
        if (this.authService.isLoggedIn()) {
            this.authService.getAuthById()
            .subscribe(
              (data: any) => {
                    const auth = new Auth(data.obj.userName, data.obj.password, data.obj._id, data.obj.admin);
                    this.authService.auth = auth;
                },
                error => console.error(error)
            );
        }
    }

}
