import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { Auth } from './auth.model';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styles: [`
    `]
})
    export class SigninComponent {
    myForm: FormGroup;

    constructor(private authService: AuthService, private router: Router) {}

    onSubmit() {
        // Set the auth for the signin request
        const auth = new Auth(this.myForm.value.userName, this.myForm.value.password);
        this.authService.signin(auth)
        .subscribe(
          (data: any) => {
              console.log(data)
                // Set the item in the localstorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('authId', data.userId);
                localStorage.setItem('admin', data.admin);
                auth.admin = data.admin;
                this.router.navigateByUrl('/auth');
            },
            error => console.error(error)
        );
        this.myForm.reset();
    }

    ngOnInit() {
        // Set formgroup variables
        this.myForm = new FormGroup({
                userName: new FormControl(null),
                password: new FormControl(null, Validators.required)
        });
    }
}
