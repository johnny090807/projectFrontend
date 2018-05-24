import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Auth} from './auth.model';

@Component({
    selector: 'app-authentication',
    template: `

        <div class="col-md-6 col-lg-4 col-md-offset-0 col-lg-offset-0">
            <app-signin *ngIf="!isLoggedIn()"></app-signin>
            <app-logout *ngIf="isLoggedIn()"></app-logout>
        </div>
    `,
    styles: [`
        @media screen and (min-width: 992px){

        }
       @media screen and (max-width: 991px){
           .right{
               margin-top: 50px;
           }
       }

    `]
})
export class AuthenticationComponent implements OnInit {

    public auth: Auth;

    constructor(private authService: AuthService) {}
    // check on if someone is logged in
    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    ngOnInit() {
        // take the auth from the auth service
        this.auth = this.authService.auth;
    }

}



        // <!--<header class="row spacing">
        //     <nav class="col-md-8 col-md-offset-2">
        //         <ul class="nav nav-tabs">
        //             <!--<li routerLinkActive="active"><a [routerLink]="['signup']">Signup</a></li>-->
        //             <li routerLinkActive="active" *ngIf="isLoggedIn()" ><a [routerLink]="['logout']">Logout</a></li>
        //             <li routerLinkActive="active" *ngIf="!isLoggedIn()"><a [routerLink]="['signin']">Signin</a></li>
        //         </ul>
        //     </nav>
        // </header>-->
