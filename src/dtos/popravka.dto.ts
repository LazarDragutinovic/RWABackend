import { Popravka } from "src/models/popravka";



export class PopravkaDto {

    constructor(popravka:Popravka){
        this.id= popravka.id
        this.cena= popravka.cena;
        this.opis=popravka.opis;
        this.obavljena=popravka.obavljena;
        this.voziloId=popravka.vozilo.id;
        if(popravka.mehanicar)this.mehanicarId=popravka.mehanicar.id;
    }

    id: number;
    cena: number;
    opis: string;
    obavljena: boolean
    voziloId: number
    mehanicarId: number
}