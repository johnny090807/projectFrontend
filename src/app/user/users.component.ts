import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-users',
    template: `
        <div class="col-md-6 col-lg-4 col-md-offset-0 col-lg-offset-0">
            <div *ngIf="this.authService.auth && this.authService.auth.admin === true">
                <app-signup></app-signup>
            </div>
            <app-ervaring *ngIf="this.authService.auth &&
             this.authService.auth.bedrijf !== undefined && this.authService.auth.ervaringen === undefined && this.authService.auth.admin === false"></app-ervaring>
        </div>
        <h4 *ngIf="this.authService.auth &&
            this.authService.auth.bedrijf === undefined && this.authService.auth.ervaringen === undefined && this.authService.auth.admin === false">Je bent nog niet gelinked aan een bedrijf!</h4>
        <h4 *ngIf="this.authService.auth &&
            this.authService.auth.bedrijf !== undefined && this.authService.auth.ervaringen !== undefined && this.authService.auth.admin === false">Je hebt al iets geplaatst!</h4>
        <div class="col-md-6 col-md-offset-0 col-lg-offset-2 right"
             *ngIf="
             this.authService.auth && this.authService.auth.admin === true">
            <app-user-list></app-user-list>
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

export class UsersComponent implements OnInit {
    constructor(public authService: AuthService,
                private router: Router) {}

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/auth');
        }
    }
}
