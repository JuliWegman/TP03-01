import DecryptToken from "../auth/jwt.js"

export default async function (req,res,next){
    if(!req.headers.authorization){
        res.status(401).send("Forbidden");

    }else{
        const token =req.headers.authorization.split(' ')[1];
        const payload=await DecryptToken(token);
        if(payload!=null){
            console.log(payload);
            req.user=payload;
            next();
        }else{
            res.status(401).send("error en el token") ;
        }
    }

}