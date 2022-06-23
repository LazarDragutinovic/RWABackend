import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Radnik } from "./radnik";
import { Vozilo } from "./vozilo";




@Entity("Popravka")
export class Popravka {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    cena: number;
    @Column()
    opis: string;
    @Column()
    obavljena: boolean
    @ManyToOne(()=>Vozilo,(vozilo)=>vozilo.popravke)
    vozilo: Vozilo
    @ManyToOne(()=>Radnik,(radnik)=>radnik.popravke)
    mehanicar: Radnik
}