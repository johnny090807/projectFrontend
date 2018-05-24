import {Ervaring} from "../ervaring/ervaring.model";

export class Bedrijf {
    constructor(public naam: string,
                public locatie: string,
                public bedrijfId?: Bedrijf,
                public ervaringen?: Ervaring[]) {}
}