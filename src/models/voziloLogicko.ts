import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vozilo } from "./vozilo";




@Entity("VoziloLogicko")
export class VoziloLogicko {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    proizvodjac: string;

    @Column()
    model: string;

    @Column()
    tip: string;


    @OneToMany(()=>Vozilo, (vozilo)=>vozilo.voziloLogicko,{cascade:true,onDelete:"CASCADE"})
    vozila: Vozilo[]
}