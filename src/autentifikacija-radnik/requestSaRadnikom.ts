import { Radnik } from "src/models/radnik";
import {Request} from "express"
interface RequestSaRadnikom extends Request {
    radnik: Radnik;
  }
   
  export default RequestSaRadnikom;