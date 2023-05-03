const jwt = require('jsonwebtoken');
const JWT_SECRET = "(FAR)^2";

const getBoth = async (req, res, next) =>
{   
    const token = req.header('auth-token');

    if (!token)
    {
        return res.status(401).json({error: "Access Denied."});
    }
    
    try
    {    
        const decryptedToken = jwt.verify(token, JWT_SECRET);        
        req.user = decryptedToken.user;
        next();
    }

    catch(error)
    {
        console.log(error);
        return res.status(401).json({error: "Access Denied."});
    }
}

module.exports = getBoth;