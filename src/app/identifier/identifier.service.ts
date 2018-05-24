import {Injectable, EventEmitter, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Headers, Http, Response} from "@angular/http";
import {ActivatedRoute} from "@angular/router";

import {Identifier} from "./identifier.model";
import {ErrorService} from "../errors/error.service";
import {AuthService} from "../auth/auth.service";


@Injectable()
export class IdentifierService implements OnInit{

    private identifiers: Identifier[] = [];
    identifierIsEdit = new EventEmitter<Identifier>();
    private sub: any;
    public userId: string;


    constructor(private http: Http,
                private authService:AuthService,
                private errorService: ErrorService,
                private route: ActivatedRoute){}

    ngOnInit(){
        this.sub = this.route
            .queryParams
            .subscribe(params => {
                // Defaults to 0 if no query param provided.
                this.userId = params['userId'] || null;
            });
    }

    /**
     * [getAllIdentifiers get all the identifiers]
     * @return {Observable<Identifier>} [returns all the identifiers]
     */
    getAllIdentifiers(): Observable<Identifier>{
        // get the token to check if you're logged in
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.get(localStorage.Url + '/api/identifier/' + token)
            .map((response:Response) => {
                // get the obj from the response
                const identifiers = response.json().obj;
                // make a constant where the identfiers will be stored in
                let transformedIdentifiers: Identifier[] = [];
                // foreach loop for all the identifiers in identifiers
                for(let identifier of identifiers){
                    // unshift all identifiers in the transformedIdentifiers constant
                    transformedIdentifiers.unshift(new Identifier(
                        // all properties of the identifier
                        identifier.nfcId,
                        identifier.user,
                        identifier._id)
                    );
                }
                this.identifiers = transformedIdentifiers;
                return transformedIdentifiers;
            })
            // catch an error that might happen
            .catch((error:Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });
    }

    /**
     * [getAllIdentifiersById Get all the identifiers by the UserID]
     * @param  {string}                 userId [to get the userId that is need to lookup al the identifiers]
     * @return {Observable<Identifier>}        [returns the identifiers by a specicfic user]
     */
    getAllIdentifiersById(userId: string): Observable<Identifier>{
        return this.http.get(localStorage.apiAddress + 'user/' + userId + '/identifiers')
            .map((response:Response) => {
                // console.log(response.json())
                const identifiers = response.json();
                let transformedIdentifiers: Identifier[] = [];
                for(let identifier of identifiers){
                    transformedIdentifiers.push(new Identifier(
                        identifier.nfcId,
                        identifier.user,
                        identifier._id
                    ))
                }
                this.identifiers = transformedIdentifiers;
                return transformedIdentifiers;
            })
            .catch((error:Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });
    }


    /**
     * [addUserIdentifier Add an identifier to a user]
     * @param  {Identifier}             identifier [get the identifier that needs to be added to the user]
     * @return {Observable<Identifier>}            [returns the result from the server]
     */
    addUserIdentifier(identifier : Identifier): Observable<Identifier>{
        // stringifies the identifier for the request
        const body = JSON.stringify(identifier);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post(localStorage.apiAddress + 'identifier' + token, body, {headers:headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });

    }

    /**
     * [deleteIdentifier delete an identifier]
     * @param  {Identifier}             identifier [adds the identifier that needs to be deleted]
     * @return {Observable<Identifier>}            [returns the identifier that was deleted]
     */
    deleteIdentifier(identifier: Identifier): Observable<Identifier>{
        // check if the auth is logged in
        if(this.authService.isLoggedIn()){
            this.identifiers.splice(this.identifiers.indexOf(identifier), 1);
        }
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete(localStorage.apiAddress + 'identifier/' + identifier.identifierId + token)
            .map((response: Response) => response.json())
            .catch((error:Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });
    }
}

