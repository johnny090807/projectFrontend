import {Component, OnInit} from '@angular/core';
import {Subscription} from './subscription.model';
import {SubscriptionService} from './subscription.service';

@Component({
    selector: 'app-subscription-list',
    template: `
        <h4>Zoek hier een abonnement:</h4>
    <hr style="display: block;
                height: 1px;
                border: 0;
                border-top: 1px solid #fff200;
                margin: 1em 0;
                padding: 0;
                background-color:#fff200;">
    <div class="form-group">
        <input type="text" class="form-control" [(ngModel)]="term.name" placeholder="Abonnement">
    </div>
        <hr style="display: block;
                height: 1px;
                border: 0;
                border-top: 1px solid #fff200;
                margin: 1em 0;
                padding: 0;
                background-color:#fff200;">
        <app-subscription
                [subscription]="subscription"
                *ngFor="let subscription of subscriptions| filterBy:term;"
        ></app-subscription>
    `
})

export class SubscriptionListComponent implements OnInit {
    subscriptions: Subscription;

    public term: any = {name : ''};
    constructor(
        private subscriptionService: SubscriptionService
    ) {}
    ngOnInit() {
        this.subscriptionService.getAllSubscriptions()
            .subscribe(
                (subscriptions: Subscription) => {
                    this.subscriptions = subscriptions;
                }
            );
    }
}
