import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Auth} from '../auth/auth.model';
import {Bedrijf} from '../bedrijf/bedrijf.model';
import {BedrijfService} from '../bedrijf/bedrijf.service';

@Component({
    selector: 'app-user-list',
    template: `
        <div class="" *ngIf="authService.isLoggedIn()">
            <h4>Zoek hier een gebruiker</h4>
            <hr style="display: block;
                height: 1px;
                border: 0;
                border-top: 1px solid #fff200;
                margin: 1em 0;
                padding: 0;
                background-color:#fff200;">
            <div class="form-group">
                <label for="userName">Zoek op Email:</label>
                <input type="text" class="form-control" [(ngModel)]="term.userName" placeholder="Email">
            </div>
            <app-user
                    [auth]="auth"
                    *ngFor="let auth of auths| filterBy:term;">
            </app-user>
        </div>
    `
})
export class UserListComponent implements OnInit {
    auths: Auth[];
    bedrijven: Bedrijf[];
    public term: any = {userName : ''};
    constructor(public authService: AuthService,
                private bedrijfService: BedrijfService) {}

    ngOnInit() {
        if (this.authService.isLoggedIn()) {
            this.authService.getAuths()
                .subscribe(
                    (auths: any) => {
                        this.auths = auths.obj;
                    }
                );
        }
    }
}
