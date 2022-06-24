import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Iznajmljivanje } from "./iznajmljivanje";
import { Like } from "./like";





@Entity("Korisnik")
export class Korisnik {

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
    public email: string

    @Column()
    lozinka: string

    @Column({
        unique:true,
        nullable:true
    })
    jmbg: string

    @Column()
    brojTelefona: string

    @OneToMany(type=>Like, like=>like.korisnik, { cascade:true,onDelete:"SET NULL"})
    likes: Like[]

    @OneToMany(type=>Iznajmljivanje, iznajmljivanje=>iznajmljivanje.korisnik)
    iznajmljivanja: Iznajmljivanje[]
}