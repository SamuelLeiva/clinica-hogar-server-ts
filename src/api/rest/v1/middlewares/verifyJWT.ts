import * as jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";
import User from "../model/User";

const NAMESPACE = "Auth middlewares";

//extraer token de localStorage
const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header("authorization") || req.header("Authorization");
    console.log('authHeader', authHeader)

    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    
    const token: string = authHeader.replace("Bearer ", "");


    // jwt.verify(
    //   token,
    //   process.env.JWT_SECRET!,
    //   (err, decoded) => {
    //     if(err) return res.sendStatus(403)
    //   }
    // )

    let decoded: any;

    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      )
      console.log('decoded', decoded);
    } catch (error) {
      console.log(error);
      return res.sendStatus(403);
    }
    

    console.log("decoded", decoded);

    //if(!decoded) return res.sendStatus(403);

    const user = await User.findOne({
      _id: decoded._id,
      //aca buscar por roles cuando se agregue roles al app
    });

    console.log('user', user)

    if (!user) return res.sendStatus(401);

    

    //req.body.token = token;
    req.body.user = user;
    next();
};

export { verifyJWT };
