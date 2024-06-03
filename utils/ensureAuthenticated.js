const jwt = require('jsonwebtoken');


const ensureAuthenticated = (req , res , next) => {
    if(!req.header['Author']){
        return res.status(403)
          .json({message : 'Token is required'});
    }
    try{
        const decoded = jwt.verify(req.header['Authorization'],process.env.SECRET);
        return next();
    }catch(error){
        return res.status(403)
        .json({message : 'Token is required'});
    }

}
module.exports = {
    ensureAuthenticated
}