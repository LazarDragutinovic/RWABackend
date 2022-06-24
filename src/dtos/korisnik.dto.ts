import { Korisnik } from "src/models/korisnik"




export class KorisnikDto {
    
    constructor(korisnik: Korisnik) {
        this.ime = korisnik.ime;
        this.prezime = korisnik.prezime;
        this.email = korisnik.email;
        this.lozinka = korisnik.lozinka;
        this.brojTelefona = korisnik.brojTelefona
        this.id = korisnik.id;
        this.jmbg = korisnik.jmbg
    }

    id: number;

    ime: string

    
    prezime: string

    jmbg: string;

    email: string

    lozinka: string

    brojTelefona: string
}