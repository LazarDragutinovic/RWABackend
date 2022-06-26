
import { throws } from "assert";
import { SlikaAutomobila } from "src/models/slika-Automobila";
import {Vozilo} from "../models/vozilo"

export class VoziloDto {
   
    constructor(vozilo: Vozilo){
        this.id = vozilo.id;
        this.godiste = vozilo.godiste;
        this.cenaPoDanu = vozilo.cenaPoDanu;
        this.idLogickogVozila = vozilo.voziloLogicko.id
        if(vozilo.slike!== undefined)this.slike=vozilo.slike  
        
    }

    id: number;
    
    godiste: number;

    cenaPoDanu: number;

    idLogickogVozila: number;
    slike: SlikaAutomobila[]
}