import {Component, Input, OnInit} from "@angular/core";
import {Subscription} from "./subscription.model";
import {AuthService} from "../auth/auth.service";
import {SubscriptionService} from "./subscription.service";
import {NgForm} from "@angular/forms";
import {Auth} from "../auth/auth.model";

@Component({
    selector: 'app-subscription-input',
    templateUrl: './subscription-input.component.html',
    styles:[`
        button {
            float:right;
            background: linear-gradient(to right,#671E9D, #03AEF1  );
        }
        button:hover{
            color: white;
            border: 0px;
            background: linear-gradient(to right,#03AEF1  , #671E9D);
        }
    `]
})
export class SubscriptionInputComponent implements OnInit{
    @Input() subscription: Subscription;
    public auth:Auth;
    constructor(
        public authService:AuthService,
        private subscriptionService: SubscriptionService
    ){}
    ngOnInit(){

    }

    onSubmit(form: NgForm){
            const subscription = new Subscription(form.value.name, form.value.description, form.value.discount);
            this.subscriptionService.addSubscription(subscription)
                .subscribe(
                    data =>  console.log("Abonnement " + data.name + " toegevoegd."),
                    error => console.log(error)
                );
            form.resetForm();
    }
}