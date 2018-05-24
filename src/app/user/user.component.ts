import {Component, Input, OnInit} from '@angular/core';

import {AuthService} from '../auth/auth.service';
import {Auth} from '../auth/auth.model';
import {Bedrijf} from '../bedrijf/bedrijf.model';
import {BedrijfService} from '../bedrijf/bedrijf.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styles: [`
        *{
            color:black;
        }
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
        a.red{
            background: linear-gradient(to right, #671E9D , #03AEF1);
            color: white;
            margin-right: 20px;
        }
        .red .red:hover{
            background: linear-gradient(to right,#03AEF1 , #671E9D );
        }
        .red .red:active{
            background: linear-gradient(to right,#03AEF1 , #671E9D );
        }
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }
        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }
        .tabs{
            float:right;
            height:20px;
        }
        .buttons{
            float:right;
        }
        .dropdown{
            float:left;
        }
        .credit-tab{
            min-height:30px;
        }
        .credit-value{
            float:left;
            padding-top:5px;
        }
        .card-tab .new div{
            float:left;
        }
        .card-tab .new button{
            float:right;
        }
        .card-tab .new{
            width:100%;
        }
        .card-tab .current{
            width:100%;
        }
        .card-tab{
            width:100%;
        }
        .card-button{
            /*!*#FF9900*! Oranje*/
            /*#363636 Grijs*/
            border-radius: 25px;
            color: white;
            padding: 5px 10px;
            text-align: center;
            display: inline-block;
            margin: 4px 2px;
        }
        .properties-tab{
            clear: both;
            width:100%;
            min-height:150px;
        }
        .properties-tab label{
            min-width:85px;
        }
        .properties-tab button{
            clear: both;
            float:right;
        }
        .subscription-tab{
            clear: both;
            width:100%;
            min-height:50px;
        }
        footer{
            clear: both;
        }
    `]
})

export class UserComponent implements OnInit {
    @Input() bedrijven: Bedrijf[];
    @Input() auth: Auth;
    public bedrijf: Bedrijf;
    public allAuths: Auth;
    public bedrijfNaam: string;
    constructor(public authService: AuthService,
                private bedrijfService: BedrijfService) {
    }

    ngOnInit(){

        this.bedrijfService.getAllBedrijven()
            .subscribe(
                (bedrijven: Bedrijf[]) => {
                    this.bedrijven = bedrijven;
                }
            );
        this.bedrijfService.getBedrijfBijId(this.auth.bedrijf)
            .subscribe(
                (data:any) => {
                    this.bedrijfNaam = data.obj.naam;
                }
            )
        this.authService.getAuths()
            .subscribe(
                (auths: Auth) => {
                    this.allAuths = auths;
                }
            );
        }

        voegBedrijfToe(){
            this.bedrijfService.addUserBedrijf(this.auth._id, this.bedrijf)
                .subscribe(
                    (data: any) => {
                        this.bedrijfNaam = this.bedrijf.naam
                    }
                )
        }

        setBedrijf(bedrijf: Bedrijf) {
            this.bedrijf = bedrijf;
        }

}
