import { stat } from "fs";
import { Sastanak, Status } from "src/models/sastanak";




export class SastanakDto {

    constructor(sastanak: Sastanak) {
        this.id = sastanak.id
        this.tema = sastanak.tema
        this.mesto = sastanak.mesto
        this.vreme = sastanak.vreme
        this.status =sastanak.status
        this.zakazaoId = sastanak.zakazao.id
    }

    id: number

    tema: string

    mesto: string


    vreme: Date;

    
    status: Status

    
    zakazaoId: number;
}