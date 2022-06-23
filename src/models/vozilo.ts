


import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Centar } from "./centar";
import { Iznajmljivanje } from "./iznajmljivanje";
import { Like } from "./like";
import { Popravka } from "./popravka";
import { SlikaAutomobila } from "./slika-Automobila";
import { VoziloLogicko } from "./voziloLogicko";




@Entity("Vozilo")
export class Vozilo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    godiste: number;

    @Column()
    cenaPoDanu: number

    @ManyToOne(()=>VoziloLogicko,(voziloLogicko)=>voziloLogicko.vozila)
    voziloLogicko: VoziloLogicko

    @OneToMany(()=>Popravka, (popravka)=>popravka.vozilo,{cascade:true,onDelete:"SET NULL"})
    popravke: Popravka[]

    @OneToMany(type=>Like, like=>like.vozilo, { cascade:true,onDelete:"SET NULL"})
    likes: Like[]

    @ManyToOne(type=>Centar, centar=>centar.vozila)
    centar: Centar;

    @OneToMany(type=>SlikaAutomobila, slikaAutomobila=>slikaAutomobila.vozilo, {onDelete:"CASCADE", cascade:true})
    slike: SlikaAutomobila[]

    @OneToMany(type=>Iznajmljivanje, iznajmljivanje=>iznajmljivanje.vozilo)
    iznajmljivanja: Iznajmljivanje[]
}


