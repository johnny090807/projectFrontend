import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Bedrijf} from './bedrijf.model';
import {ErrorService} from '../errors/error.service';
import {AuthService} from '../auth/auth.service';
import {User} from '../user/user.model';
import {Identifier} from '../identifier/identifier.model';
import {Auth} from '../auth/auth.model';

@Injectable()
export class BedrijfService {
    public bedrijven: Bedrijf[];
    constructor(private http: Http,
                private errorService:ErrorService,
                private authService:AuthService){}


    addBedrijf(bedrijf : Bedrijf): Observable<Bedrijf>{
        console.log(bedrijf)
           // zorgt dat je de body can comprimeren voor de request
        const body = JSON.stringify(bedrijf);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

        return this.http.post(localStorage.apiAddress + 'bedrijf' + token, body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });

}
    getAllBedrijven(){

        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
            return this.http.get(localStorage.apiAddress + 'bedrijf' + token)
                .map((response:Response) => {
                    // console.log(response.json())
                    const bedrijven = response.json().obj;
                    let transformedBedrijven: Bedrijf[] = [];
                    for(const bedrijf of bedrijven){
                        transformedBedrijven.push(new Bedrijf(
                            bedrijf.naam,
                            bedrijf.locatie,
                            bedrijf._id
                        ))
                    }
                    this.bedrijven = transformedBedrijven;
                    console.log(bedrijven);
                    return transformedBedrijven;

                })
                .catch((error:Response) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json());

                });
    }
    getBedrijfBijId(bedrijfId: Bedrijf){
        //console.log(bedrijfId)
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.get(localStorage.apiAddress + 'bedrijf/' + bedrijfId + token)
            .map((response:Response) => response.json())
            .catch((error:Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });
    }
    deleteBedrijf(bedrijf: Bedrijf){
            // check if the auth is logged in
            if(this.authService.isLoggedIn()){
            this.bedrijven.splice(this.bedrijven.indexOf(bedrijf), 1);
        }
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete(localStorage.apiAddress + 'bedrijf/' + bedrijf.bedrijfId + token)
            .map((response: Response) => response.json())
            .catch((error:Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });
    }
    patchBedrijf(bedrijf: Bedrijf): Observable<Bedrijf> {
        console.log(bedrijf)
        const body = JSON.stringify(bedrijf);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.patch(localStorage.apiAddress + 'bedrijf/' + bedrijf.bedrijfId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    addUserBedrijf(authId: any, bedrijf: Bedrijf): Observable<Bedrijf>{
        // stringifies the identifier for the request
        const body = JSON.stringify(bedrijf);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post(localStorage.apiAddress + 'bedrijf/'+ authId + token, body, {headers:headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });

    }
}