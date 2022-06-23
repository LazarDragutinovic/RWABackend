import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Radnik } from "./radnik";

enum Status {
    
    OK="OK",
    OTKAZAN = "OTKAZAN",
    ODLOZEN = "ODLOZEN"

}

export {Status}

@Entity("Sastanak")
export class Sastanak {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    mesto: string

    @Column()
    vreme: Date;

    @Column({
        type:"simple-enum",
        enum:Status
    })
    status: Status

    @ManyToOne(type=>Radnik,radnik=>radnik.zakazaoSastanke)
    zakazao: Radnik;

    @ManyToMany(type=>Radnik, radnik=>radnik.sastanci)
    @JoinTable({
        name:"Pozvani"
    })
    pozvani: Radnik[]
}