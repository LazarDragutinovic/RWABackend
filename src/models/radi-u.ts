import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Centar } from "./centar";
import { Radnik } from "./radnik";




@Entity("RadiU")
export class RadiU {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    datumOd: Date

    @Column({
        nullable:true
    })
    datumDo: Date

    @ManyToOne(type=>Radnik, radnik=>radnik.poslovi)
    radnik: Radnik

    @ManyToOne(type=>Centar, centar=>centar.radnici)
    centar: Centar
}