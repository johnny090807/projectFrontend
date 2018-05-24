import { Component } from "@angular/core";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-logout',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <h4>Log uit:</h4>
                <hr style="display: block;
                height: 1px;
                border: 0;
                border-top: 1px solid #fff200;
                margin: 1em 0;
                padding: 0;
                background-color:#fff200;">
            <button class="btn btn-danger" (click)="onLogout()">Logout</button>
        </div>
    `
})
export class LogoutComponent {

    constructor(private authService: AuthService, private  router: Router){}
    onLogout() {
        this.authService.logout();
        this.router.navigate(['/auth', 'signin']);
    }
}