import {Component} from "@angular/core";
import {AuthService} from "../auth/auth.service";
@Component({
    selector:'app-subscriptions',
    template:`
        <div class="col-md-6 col-lg-4 col-md-offset-0 col-lg-offset-0">
        <app-subscription-input *ngIf="authService.isLoggedIn()"></app-subscription-input>
        </div>
        <div class="col-md-6 col-md-offset-0 col-lg-offset-2 right">
            <app-subscription-list *ngIf="authService.isLoggedIn()"></app-subscription-list>
        </div>
    `,
    styles: [`        
	   /*.right { position: absolute; margin-right: 20px;right: 0; top: 130px; width: 50%;}*/
        @media screen and (min-width: 992px){
         
        }
       @media screen and (max-width: 991px){
           .right{
               margin-top: 50px;
           }
       }
    
    `]
})
export class SubscriptionsComponent{
    constructor(public authService:AuthService){}
}