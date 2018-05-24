import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {ErrorService} from '../errors/error.service';
import {AuthService} from '../auth/auth.service';
import {Ervaring} from './ervaring.model';

@Injectable()
export class ErvaringService {
    public ervaringen : Ervaring[];
    constructor(private http: Http,
                private errorService: ErrorService,
                private authService: AuthService){}

    // getAllBedrijfErvaringen() {
    //     const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    //     return this.http.get(localStorage.apiAddress + 'ervaring' + token)
    //         .map((response:Response) => {
    //             // console.log(response.json())
    //             const ervaringen = response.json().obj;
    //             const transformedErvaringen: Ervaring[] = [];
    //             for(const ervaring of ervaringen){
    //                 transformedErvaringen.push(new Ervaring(
    //                     ervaring.description,
    //                     ervaring.rating
    //             ))
    //             }
    //             this.ervaringen = transformedErvaringen;
    //             console.log(ervaringen);
    //             return transformedErvaringen;
    //
    //         })
    //         .catch((error:Response) => {
    //             this.errorService.handleError(error.json());
    //             return Observable.throw(error.json());
    //
    //         });
    // }
    getAllBedrijfErvaringen() {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.get(localStorage.apiAddress + 'ervaring' + token)
            .map((response:Response) => response.json())
            .catch((error:Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });
    }
    getErvaringById(ervaringId: Ervaring){
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.get(localStorage.apiAddress + 'ervaring/' + ervaringId + token)
            .map((response:Response) => response.json())
            .catch((error:Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });
    }
}