import { Centar } from "src/models/centar";
import { Iznajmljivanje } from "src/models/iznajmljivanje";
import { Korisnik } from "src/models/korisnik";
import { Like } from "src/models/like";
import { Popravka } from "src/models/popravka";
import { RadiU } from "src/models/radi-u";
import { Radnik } from "src/models/radnik";
import { Sastanak } from "src/models/sastanak";
import { SlikaAutomobila } from "src/models/slika-Automobila";
import { SlikaCentra } from "src/models/slika-centar";
import { Vozilo } from "src/models/vozilo";
import { VoziloLogicko } from "src/models/voziloLogicko";
import { ConnectionOptions } from "typeorm";



export const typeOrmConnectionOptions : ConnectionOptions = {
    type:"postgres",
    host:'host.docker.internal',
    port: 5432,
    username:"postgres",
    password:"lozinka",
    entities:[Popravka,Radnik,Korisnik,Vozilo,VoziloLogicko,Centar,Sastanak,Like,RadiU,Iznajmljivanje,SlikaAutomobila,SlikaCentra],
    synchronize:true,
    database:"rentacar"
}