import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Vozilo } from "./vozilo";

@Entity("SlikaAutomobila")
export class SlikaAutomobila {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    url: string;

    @ManyToOne(type=>Vozilo, vozilo=>vozilo.slike,{ cascade: true, onDelete: 'CASCADE' })
    vozilo: Vozilo
}