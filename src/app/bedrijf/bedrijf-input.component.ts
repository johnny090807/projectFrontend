import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BedrijfService} from './bedrijf.service';
import {Bedrijf} from './bedrijf.model';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-bedrijfinput',
    template: `
        <div class="col-md-8 col-md-offset-2" >
            <h4 *ngIf="authService.isAdmin()">Maak een bedrijf aan:</h4>
            <hr style="display: block;
                height: 1px;
                border: 0;
                border-top: 1px solid #fff200;
                margin: 1em 0;
                padding: 0;
                background-color:#fff200;" *ngIf="authService.isAdmin()">
            <form [formGroup]="myForm" (ngSubmit)="onSubmit()" *ngIf="authService.isAdmin()">
                <div class="form-group">
                    <label for="naam">Naam van bedrijf: </label>
                    <input
                            type="text"
                            id="Bedrijf"
                            class="form-control"
                            formControlName="Bedrijf">
                </div>
                <div class="form-group">
                    <label for="Locatie">De locatie van het bedrijf:</label>
                    <input
                            type="text"
                            id="Locatie"
                            class="form-control"
                            formControlName="Locatie">
                </div>
                <button
                        class="btn btn-primary"
                        type="submit"
                        [disabled]="!myForm.valid">Submit</button>
            </form>

        <app-bedrijflist></app-bedrijflist>
        </div>
    `
})
export class BedrijfInputComponent{

    myForm: FormGroup;
    constructor(private bedrijfService: BedrijfService,
                public authService: AuthService,
                private router: Router){}

    onSubmit(){
        const bedrijf = new Bedrijf(this.myForm.value.Bedrijf, this.myForm.value.Locatie);
        console.log(bedrijf)
        this.bedrijfService.addBedrijf(bedrijf)
            .subscribe(
                (data: any) => {
                    console.log(data)

                },
                error => console.error(error)
            );
        this.myForm.reset();
    }

    ngOnInit() {
        if(!this.authService.isLoggedIn()){
            this.router.navigateByUrl('/auth');
        }
        // zet de variabelen van de form
        this.myForm = new FormGroup({
            Bedrijf: new FormControl(null, Validators.required),
            Locatie: new FormControl(null, Validators.required)
        });
    }
}