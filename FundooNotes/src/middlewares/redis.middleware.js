import {client} from "../config/redis";

export const redisCheck = async(req, res, next) => {
    
    const value = await client.get('getAllData');
    if(value!=null){
        res.status(200).json({
            code: 200,
            data: JSON.parse(value),
            message: "All notes fetched successfully from redis"
        });
    }
    else{
        next();
    }
}

export const redisGetSingle = async(req, res, next) => {
    
    const value = await client.get('getAData');
    if(value!=null){
        res.status(200).json({
            code: 200,
            data: JSON.parse(value),
            message: "Note fetched successfully from redis"
        });
    }
    else{
        next();
    }
}

