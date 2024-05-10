import jwt from "jsonwebtoken"

export default async function (token){

const secretKey = "AguanteBoca123:)";
var payloadOriginal = null;

try {
    payloadOriginal = jwt.verify(token, secretKey);
} catch (error) {
   console.log(error); 
}
    return payloadOriginal
}

