import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Centar } from "./centar";




@Entity("SlikaCentra")
export class SlikaCentra {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    url: string;

    @OneToOne(type=>Centar, centar=>centar.slika)
    centar: Centar
}