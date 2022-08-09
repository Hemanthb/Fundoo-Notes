import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];
    jwt.verify(bearerToken, process.env.SECRET_KEY,function(err,decoded){
      if(err){
       res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: 'Authorization token is Incorrect'
        });
      }else{
        //res.locals.user = user;
        //res.locals.token = bearerToken;
        req.body.userId = decoded.EmailId;
        next();
      }
    });
    
  
};
