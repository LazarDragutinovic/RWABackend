import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Korisnik } from "./korisnik";
import { Radnik } from "./radnik";
import { Vozilo } from "./vozilo";



@Entity("Iznajmljivanje")
export class Iznajmljivanje {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    datum: Date

    @Column()
    dana:number

    @ManyToOne(type=>Radnik, radnik=>radnik.iznajmljivanja)
    sluzbenik: Radnik;

    @ManyToOne(type=>Korisnik, korisnik=>korisnik.iznajmljivanja)
    korisnik: Korisnik;

    @ManyToOne(type=>Vozilo, vozilo=>vozilo.iznajmljivanja)
    vozilo: Vozilo
    
}