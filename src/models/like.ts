import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Korisnik } from "./korisnik";
import { Vozilo } from "./vozilo";




@Entity("Like")
export class Like {

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(type=>Vozilo, vozilo=>vozilo.likes)
    vozilo:Vozilo

    @ManyToOne(type=>Korisnik, korisnik=>korisnik.likes)
    korisnik:Korisnik
}