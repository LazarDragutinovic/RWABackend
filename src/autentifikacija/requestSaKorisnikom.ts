


import { Request } from 'express';
import { Korisnik } from 'src/models/korisnik';

 
interface RequestSaKorisnikom extends Request {
  korisnik: Korisnik;
}
 
export default RequestSaKorisnikom;