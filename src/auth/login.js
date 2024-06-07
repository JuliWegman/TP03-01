import jwt from "jsonwebtoken"
import "dotenv/config"

export default async function (Usuario){

    const options={
    expiresIn:"5h",
    issuer:"Wegman_Zaselsky"
    }   
    const payload = {"id":Usuario.id}
    const token=jwt.sign(payload,process.env.SECRET_KEY,options);

    return token; 

}