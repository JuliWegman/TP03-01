import jwt from "jsonwebtoken"
import "dotenv/config"

export default async function (token){

const secretKey = "AguanteBoca123:)";
var payloadOriginal = null;

try {
    payloadOriginal = jwt.verify(token, process.env.SECRET_KEY);

} catch (error) {

    return null;

}
    return payloadOriginal
}

