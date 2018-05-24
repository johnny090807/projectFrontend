import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "./auth.service";
import { Auth } from "./auth.model";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styles:[`
        button{
            color: white;
            border: 0px;
            background: linear-gradient(to right, #671E9D , #03AEF1);
        }
        button:hover{
            color: white;
            border: 0px;
            background: linear-gradient(to right,#03AEF1  , #671E9D);
        }
    `]
})
export class SignupComponent implements OnInit {
    myForm: FormGroup;

    constructor(private authService: AuthService) {}

    onSubmit() {
        // set the auth for the signup request
        const auth = new Auth(this.myForm.value.userName, this.myForm.value.password);
        this.authService.signup(auth)
            // subscribe to all the data that is sent back
            .subscribe(
                data => console.log(data),
                error => console.log(error)
            );
        this.myForm.reset();
    }

    ngOnInit() {
        // set the formControl
        this.myForm = new FormGroup({
            userName: new FormControl(null, Validators.email),
            password: new FormControl(null, Validators.required)
        });
    }
}