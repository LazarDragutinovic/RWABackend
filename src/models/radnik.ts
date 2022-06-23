import { throws } from "assert"
import { RadnikDto } from "src/dtos/radnik-dto"
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Iznajmljivanje } from "./iznajmljivanje"
import { Popravka } from "./popravka"
import { RadiU } from "./radi-u"
import { Sastanak } from "./sastanak"


enum Pozicija {
    UPRAVNIK="UPRAVNIK",
    SLUZBENIK="SLUZBENIK",
    MEHANICAR="MEHANICAR"
}

export {Pozicija}

@Entity("Radnik")
export class Radnik {


    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable:false
    })
    ime: string

    @Column({
        nullable:false
    })
    prezime: string

    @Column({
        unique:true,
        nullable:false
    })
    email: string

    @Column({
        type:"simple-enum",
        enum:Pozicija
    })
    pozicija: Pozicija

    @OneToMany((type)=>Popravka,(popravka)=>popravka.mehanicar,{cascade:true, onDelete:"SET NULL"})
    popravke: Popravka[]


    @OneToMany(type=>RadiU,radiu=>radiu.radnik, {cascade: true,onDelete:"CASCADE"})
    poslovi: RadiU[]

    @ManyToMany(type=>Sastanak, sastanak=>sastanak.pozvani)
    sastanci: Sastanak[]

    @OneToMany(type=>Sastanak,sastanak=>sastanak.zakazao, {cascade: true, onDelete:"CASCADE"})
    zakazaoSastanke: Sastanak[]

    @OneToMany(type=>Iznajmljivanje, iznajmljivanje=>iznajmljivanje.sluzbenik)
    iznajmljivanja: Iznajmljivanje[]
}