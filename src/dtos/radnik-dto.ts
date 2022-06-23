import { Pozicija, Radnik } from "src/models/radnik"






export class RadnikDto {

    constructor(radnik: Radnik) {
        this.id = radnik.id;
        this.ime = radnik.ime;
        this.prezime = radnik.prezime;
        this.email = radnik.email
        this.pozicija = radnik.pozicija
    }
    id: number

    ime: string

    
    prezime: string

    
    email: string

   
    pozicija: Pozicija
}