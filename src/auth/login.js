import jwt from "jsonwebtoken"
import "dotenv/config"

export default async function (Usuario){

    const options={
    expiresIn:"5h",
    issuer:"Wegman_Zaselsky"
}   


    const payload = {"id":Usuario.id}
    // payloadJSON = JSON.parse(payloadJSON)
    console.log(typeof payload);

    console.log("a 2");
    const token=jwt.sign(payload,process.env.SECRET_KEY,options);
    console.log("b");

    return token; 

}