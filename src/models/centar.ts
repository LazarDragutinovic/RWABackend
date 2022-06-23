import { triggerAsyncId } from "async_hooks";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RadiU } from "./radi-u";
import { SlikaCentra } from "./slika-centar";
import { Vozilo } from "./vozilo";





@Entity("Centar")
export class Centar {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    naziv:string;

    @Column()
    adresa: string;

    @Column()
    telefon: string;


    @OneToMany(type=>Vozilo, vozilo=>vozilo.centar, {cascade:true, onDelete:"SET NULL"})
    vozila: Vozilo[]

    @OneToMany(type=>RadiU, radiu=>radiu.centar, {cascade:true, onDelete:"CASCADE"})
    radnici: RadiU[]

    @OneToOne(type=>SlikaCentra, slikaCentra=>slikaCentra.centar,{cascade:true, onDelete:"CASCADE"})
    @JoinColumn()
    slika: SlikaCentra
}