import { Iznajmljivanje } from "src/models/iznajmljivanje";




export class IznajmljivanjeDto {

    constructor(iznajmljivanje: Iznajmljivanje) {
        this.id = iznajmljivanje.id;
        this.sluzbenikId = iznajmljivanje.sluzbenik.id
        this.voziloId = iznajmljivanje.vozilo.id;
        this.korisnikId = iznajmljivanje.korisnik.id;
        this.dana = iznajmljivanje.dana;
        this.datum = iznajmljivanje.datum       
    }

    id: number

    sluzbenikId: number;

    voziloId: number;

    korisnikId: number;

    dana:number;

    datum: Date

    zavrseno: boolean
}