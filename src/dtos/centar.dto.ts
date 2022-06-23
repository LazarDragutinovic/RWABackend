import { Centar } from "src/models/centar";


export class CentarDto {
    

    constructor(centar: Centar) {
        this.id = centar.id;
        this.naziv = centar.naziv;
        this.adresa = centar.adresa;
        this.grad = centar.grad;
        this.telefon = centar.telefon;
    }

    id:number;

 
    naziv:string;

   
    adresa: string;

   
    grad: string

    telefon: string;
}