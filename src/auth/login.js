import jwt from "jsonwebtoken"

export default async function (Usuario){

const secretKey = "AguanteBoca123:)";

const options={
    expires:"1h",
    issuer:"Wegman_Zaselsky"
}

const payload=Usuario.id


return jwt.sign(payload,secretKey,options);
}