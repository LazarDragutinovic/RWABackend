
import { throws } from "assert";
import {Vozilo} from "../models/vozilo"

export class VoziloDto {
   
    constructor(vozilo: Vozilo){
        this.id = vozilo.id;
        this.godiste = vozilo.godiste;
        this.cenaPoDanu = vozilo.cenaPoDanu;
        this.idLogickogVozila = vozilo.voziloLogicko.id
    }

    id: number;
    
    godiste: number;

    cenaPoDanu: number;

    idLogickogVozila: number;
}