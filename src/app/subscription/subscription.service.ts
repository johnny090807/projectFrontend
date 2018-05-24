import {Headers, Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';

import {Subscription} from './subscription.model';
import {Observable} from 'rxjs/Observable';
import {ErrorService} from '../errors/error.service';
import {AuthService} from '../auth/auth.service';
import {User} from '../user/user.model';

@Injectable()
export class SubscriptionService {
        private subscriptions: Subscription[] = [];
        //private auth:any;

        constructor(
                    private errorService: ErrorService,
                    private authService: AuthService,
                    private http: Http
                    ) {}

    /**
     * [addSubscription adds a subscription to the DB]
     * @param  {Subscription}             subscription [sends the subscription that needs to be added]
     * @return {Observable<Subscription>}              [returns the subscription that was added]
     */
    addSubscription(subscription: Subscription): Observable<Subscription> {
           // stringifies the subscription that we send in the request
            const body = JSON.stringify(subscription);
            // sets the correct headers
            const headers = new Headers({'Content-Type': 'application/json'});
            // makes a constant that stores the token for the request
            const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

            return this.http.post(localStorage.apiAddress + 'subscription' + token, body, {headers: headers})
                .map((response: Response) => {
                    const result = response.json();
                    const subscription = new Subscription(
                        result.subscription.name,
                        result.subscription.description,
                        result.subscription.discount,
                        result.subscription._id
                    );
                    this.subscriptions.unshift(subscription);
                    return subscription;
                })
                .catch((error: Response) => {
                    console.log(error);
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json());

                });
    }

    /**
     * [addUserSubscription adds the subscription to the user]
     * @param  {Subscription}             subscription [gets the subscription]
     * @param  {string}                   userId       [gets the id so the server knows which user we're talking about]
     * @return {Observable<User>}                      [returns the user that has the subscription]
     */
    addUserSubscription(subscription: Subscription, userId: string): Observable<User> {
        const body = JSON.stringify(subscription);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post(localStorage.apiAddress + 'subscription/' + userId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    /**
     * [getSubscriptionById Search for the subscription by subscriptionId]
     * @param  {User}         user [Get the user subscriptionId]
     * @return {Observable<Subscription>}      [returns the Subscription]
     */
    getSubscriptionById(user: User): Observable<Subscription> {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.get(localStorage.apiAddress + 'subscription/' + user.subscriptionPlan + '/user' + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                   // this.errorService.handleError(error.json());
                   return Observable.throw(error.json());
            });
    }

    /**
     * [getAllSubscriptionsByAuthId Get all the subscriptions by the auth ID]
     * @return {Observable<Subscription>}      [returns all the subscriptions attached to the Auth]
     */
    getAllSubscriptionsByAuthId(): Observable<Subscription> {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

        return this.http.get(localStorage.apiAddress + 'subscription/' + localStorage.authId + '/subscriptions' + token)
            .map((response: Response) => {
                const subscriptions = response.json().obj.subscriptions;
                const transformedSubscription: Subscription[] = [];
                for (const subscription of subscriptions) {
                    const newSubscription = new Subscription(
                        subscription.name,
                        subscription.description,
                        subscription.discount,
                        subscription._id
                    );
                    transformedSubscription.unshift(newSubscription);
                }
                this.subscriptions = transformedSubscription;
                return transformedSubscription;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    /**
     * [getAllSubscriptions get all the subscriptions]
     * @return {Observable<Subscription>} [returns all the subscriptions]
     */
    getAllSubscriptions(): Observable<Subscription> {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

        return this.http.get(localStorage.apiAddress + 'subscription' + token)
            .map((response: Response) => {
                const subscriptions = response.json().obj;
                const transformedSubscription: Subscription[] = [];
                for (const subscription of subscriptions) {
                    const newSubscription = new Subscription(
                        subscription.name,
                        subscription.description,
                        subscription.discount,
                        subscription._id
                    );
                    transformedSubscription.unshift(newSubscription);
                }
                this.subscriptions = transformedSubscription;
                return transformedSubscription;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    /**
     * [deleteSubscription deletes the subscription]
     * @param  {Subscription}             subscription [the subscription that needs to be deleted]
     * @return {Observable<Subscription>}              [return the subscription that was deleted]
     */
    deleteSubscription(subscription: Subscription): Observable<Subscription> {
            if (this.authService.isLoggedIn()) {
                this.subscriptions.splice(this.subscriptions.indexOf(subscription), 1);
            }
            const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
            return this.http.delete(localStorage.apiAddress + 'subscription/' + subscription.subscriptionId + token)
                .map((response: Response) => response.json())
                .catch((error: Response) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json());
                });
    }

    /**
     * [editSubscription patches the subscription]
     * @param  {Subscription}             subscription [get the subscription that need to be editted]
     * @return {Observable<Subscription>}              [returns the subscription that was editted]
     */
    editSubscription(subscription: Subscription): Observable<Subscription> {
        const body = JSON.stringify(subscription);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

        return this.http.patch(localStorage.apiAddress + 'subscription/' + subscription.subscriptionId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}
