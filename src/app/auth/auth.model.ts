import {Bedrijf} from '../bedrijf/bedrijf.model';
import {Ervaring} from '../ervaring/ervaring.model';

export class Auth {
    constructor(public userName: string,
                public password: string,
                public bedrijf?: Bedrijf,
                public ervaring?: Ervaring,
                public authId?: Auth,
                public admin: boolean = false,
                public _id?: string) {
}}

