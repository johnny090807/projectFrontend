import {Injectable, OnInit} from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Auth } from "./auth.model";
import {ErrorService} from "../errors/error.service";
import {Subscription} from "../subscription/subscription.model";
import {Ervaring} from '../ervaring/ervaring.model';

@Injectable()
export class AuthService implements OnInit{

    public auth: Auth;

	constructor(private http: Http,
				private errorService: ErrorService){}

    ngOnInit(){
      if (this.isLoggedIn()) {
        this.getAuthByToken()
          .subscribe(
            (data: any) => {
              const auth = new Auth(data.obj.userName, data.obj.password, data.obj._id, data.obj.admin);
              this.auth = auth;
            },
            error => console.error(error)
          );
      }
	  }

    /**
     * [signup Sign an auth up]
     * @param  {Auth}             auth [get the auth that someone wants to sign up]
     * @return {Observable<Auth>}      [return the auth that was signed up]
     */
    signup(auth: Auth): Observable<Auth>{
        // stringify the auth
		const body = JSON.stringify(auth);
        // set the headers because the backend can't recieve it with normal headers
		const headers = new Headers({'Content-Type': 'application/json'});
        // token for the user that has to be logged in
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
		//return the post from the server
        return this.http.post(localStorage.apiAddress + 'auth' + token, body, {headers: headers})
            // map the response from the server
            .map((response: Response)  => response.json())
            // catch any errors that might happen
            .catch((error:Response) => {
                // handle the error in the error service
                this.errorService.handleError(error.json());
                // return the observable and throw an error
                return Observable.throw(error.json());
            });
	}

     /**
      * [signin Sign an auth in]
      * @param  {Auth}             auth [get the auth that the person wants to login with from the request]
      * @return {Observable<Auth>}      [return the auth that wants to login]
      */
    signin(auth: Auth): Observable<Auth>{
        // stringify the auth so the request can send it
        const body = JSON.stringify(auth);
        // set the headers because the backend can't recieve it with normal headers
        const headers = new Headers({'Content-Type': 'application/json'});
        //return the post from the server
        return this.http.post(localStorage.apiAddress + 'auth/signin', body, {headers: headers})
            // map the response from the server
            .map((response: Response) => {
                // put the response in a variable for the return
                var result = response.json();
                // set the auth
                this.auth = auth;
                // return the result
                return result;
            })
            // catch any errors that might happen
            .catch((error:Response) => {
                // handle the error in the error service
                this.errorService.handleError(error.json());
                // return the observable and throw an error
                return Observable.throw(error.json());

            });
    }


    /**
     * [getAuthByToken Get the auth by the token]
     * @return {Observable<Auth>} [returns the auth]
     */
    getAuthByToken(): Observable<Auth>{
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.get(localStorage.apiAddress + 'auth/getAdmin' + token, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error:Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getAuthById(): Observable<Auth>{
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.get(localStorage.apiAddress + 'auth/' + localStorage.authId, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error:Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    /**
     * [addAuthSubscription add a subscription to an auth]
     * @param  {Auth}             auth         [get the auth where the subscription should be added to]
     * @param  {Subscription}     subscription [get the subscription you want to add to the auth]
     * @return {Observable<Auth>}              [returns the auth]
     */
    addAuthSubscription(auth: Auth, subscription: Subscription): Observable<Auth>{
	    const body = JSON.stringify({_id: subscription.subscriptionId});
        if(this.auth.admin === false)
        {
            throw new Error('Je bent geen Admin!');
        }else{
            const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
            const headers = new Headers({'Content-Type': 'application/json'});
            return this.http.post(localStorage.apiAddress + 'auth/' + localStorage.authId + '/subscriptions' + token,body, {headers: headers})
                .map((response: Response) => response.json())
                .catch((error: Response) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json());
                });
        }
    }

    addUserErvaring(ervaring: Ervaring){
        const body = JSON.stringify(ervaring);
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(localStorage.apiAddress + 'ervaring/' + localStorage.authId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }




    /**
     * [removeAuthSubscription remove the subscription ]
     * @param  {Auth}             auth         [get the ]
     * @param  {Subscription}     subscription [get the auth where the subscription should be deleted from]
     * @return {Observable<Auth>}              [returns the auth]
     */
    removeAuthSubscription(auth: Auth, subscription: Subscription): Observable<Auth>{
        if(this.auth.admin === false)
        {
            throw new Error('Je bent geen Admin!');
        } else {
            const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
            const headers = new Headers({'Content-Type': 'application/json'});
            return this.http.delete(localStorage.apiAddress + 'auth/' + localStorage.authId + /subscriptions/ + subscription.subscriptionId + token, {headers: headers})
                .map((response: Response) => response.json())
                .catch((error: Response) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json());
                });
        }
    }

    /**
     * [getAuths get ALL the auths from the server]
     * @return {Observable<Auth>} [returns the observable to the request]
     */
    getAuths(): Observable<Auth>{
            const headers = new Headers({'Content-Type': 'application/json'});
            return this.http.get(localStorage.apiAddress + 'auth' , {headers: headers})
                .map((response: Response) => response.json())
                .catch((error: Response) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json());
                });
    }

    /**
     * [logout log the user out by removing the localStorage]
     */
    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('authId');
        this.auth = null;
    }

    isAdmin() {
        if (!this.auth) { return false; }
        return this.auth.admin;
    }

    /**
     * [isLoggedIn check if the user is logged in]
     */
    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }




}
