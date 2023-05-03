const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const JWT_SECRET = "(FAR)^2";

const getAdmin = async (req, res, next) =>
{   
    const token = req.header('auth-token');

    if (!token)
    {
        return res.status(401).json({error: "Access Denied."});
    }
    try
    {    
        const decryptedToken = jwt.verify(token, JWT_SECRET);
        const user = await Users.findById(decryptedToken.user).select('-password');
        
        if (user.permission === 'admin')
        {
            req.user = decryptedToken.user;
        }

        else
        {
            return res.status(401).json({error: "Access Denied."});
        }

        next();
    }

    catch(error)
    {
        console.log(error);
        return res.status(401).json({error: "Access Denied."});
    }
}

module.exports = getAdmin;