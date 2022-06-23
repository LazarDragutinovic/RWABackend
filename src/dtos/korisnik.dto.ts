import { Korisnik } from "src/models/korisnik"




export class KorisnikDto {
    
    constructor(korisnik: Korisnik) {
        this.ime = korisnik.ime;
        this.prezime = korisnik.prezime;
        this.email = korisnik.email;
        this.lozinka = korisnik.lozinka;
    }

    ime: string

    
    prezime: string

    
    email: string

    lozinka: string
}