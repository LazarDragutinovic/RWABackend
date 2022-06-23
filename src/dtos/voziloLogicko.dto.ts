
import { throws } from "assert";
import {VoziloLogicko} from "../models/voziloLogicko"


export class VoziloLogickoDto {

    constructor(vozilo: VoziloLogicko) {
        this.id = vozilo.id;
        this.proizvodjac = vozilo.proizvodjac,
        this.model = vozilo.model;
        this.tip = vozilo.tip;
    }

    id: number;

    
    proizvodjac: string;

   
    model: string;

 
    tip: string;
}