import {Headers, Http, Response} from "@angular/http";
import {EventEmitter, Injectable} from "@angular/core";

import {User} from "./user.model";
import {ErrorService} from "../errors/error.service";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class UserService {
    private users: User[] = [];
    userIsEdit = new EventEmitter<User>();
    editBool = false;

    constructor(private authService:AuthService,
                private errorService: ErrorService,
                private http: Http){}


    /**
     * [addUser add an user]
     * @param  {User}             user [get the user that needs to be added]
     * @return {Observable<User>}      [return the added user]
     */
    addUser(user: User): Observable<User> {
        // stringifies the user for the request
        const body = JSON.stringify(user);
        // sets the headers
        const headers = new Headers({'Content-Type': 'application/json'});
        // sets the token for the request
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        // returns the request
        return this.http.post(localStorage.apiAddress + 'user'+ token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const user = new User(
                    result.obj.firstName,
                    result.obj.lastName,
                    result.obj.email,
                    result.obj.credit,
                    result.obj._id,
                    result.obj.identifier,
                    result.obj.subscriptionPlan);
                this.users.unshift(user);
                return user;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });
    }

    /**
     * [getUsers Get all the users]
     * @return {Observable<User>} [returns all the users]
     */
    getUsers(): Observable<User>{
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.get(localStorage.apiAddress + 'user' + token)
            .map((response:Response) => {
                const users = response.json().obj;
                let transformedUsers: User[] = [];
                for(let user of users){
                    let newUser = new User(
                        user.firstName,
                        user.lastName,
                        user.email,
                        user.credit,
                        user._id,
                        user.identifier,
                        user.subscriptionPlan
                        );
                    transformedUsers.unshift(newUser);
                }
                this.users = transformedUsers;
                return transformedUsers;
            })
            .catch((error:Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });
    }
    // editIdentifier(bool: boolean){
    //     this.editBool = bool;
    //     return this.editBool;
    // }
    // editUser(user:User){
    //     this.userIsEdit.emit(user);
    // }

    /**
     * [updateUser Updates the user that need to be updated]
     * @param  {User}             user [get the user that nees to be updated]
     * @return {Observable<User>}      [returns the user that was updated]
     */
    updateUser(user:User): Observable<User> {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.patch(localStorage.apiAddress + 'user/' + user.userId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    /**
     * [deleteUser Deletes the user]
     * @param  {User}             user [get the user that needs to be deleted]
     * @return {Observable<User>}      [returns the user that was deleted]
     */
    deleteUser(user:User):Observable<User>{
        if(this.authService.isLoggedIn()){
            this.users.splice(this.users.indexOf(user), 1);
        }
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete(localStorage.apiAddress + 'user/' + user.userId + token)
            .map((response: Response) => response.json())
            .catch((error:Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });
    }

}