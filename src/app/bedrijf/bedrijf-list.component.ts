import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../user/user.service';
import {Bedrijf} from './bedrijf.model';
import {BedrijfService} from './bedrijf.service';
import {ErvaringService} from "../ervaring/ervaring.service";

@Component({
    selector: 'app-bedrijflist',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <h4>Zoek hier naar een bedrijf op naam:</h4>
            <input type="text" class="form-control" [(ngModel)]="term.naam" placeholder="Naam">
            <div >
            <app-bedrijf
                    [bedrijf]="bedrijf"
                    *ngFor="let bedrijf of bedrijven| filterBy:term;">
            </app-bedrijf>
            </div>
        </div>
    `
})
export class BedrijfListComponent implements OnInit {
    public term: any = {naam: '', locatie: ''};
    public bedrijven: Bedrijf;

    constructor(
                private route: ActivatedRoute,
                private authService: AuthService,
                private userService: UserService,
                private bedrijfService: BedrijfService,
                private ervaringService: ErvaringService) {}

    ngOnInit() {
        // een check of the gebruiker admin is om alle bedrijven te bekijken
        this.ervaringService.getAllBedrijfErvaringen()
            .subscribe(
                (data: any) => {
                   this.bedrijven = data.obj;
                   this.bedrijfService.bedrijven = data.obj;
                }
            );


    }
}
