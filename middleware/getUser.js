//Rayan will do this

/*
Example:
const getUser = (req, res, next) =>
{   
    const token = req.header('auth-token');
    if (!token)
    {
        return res.status(401).json({error: "Access Denied."});
    }
    try
    {    
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }

    catch(error)
    {
        return res.status(401).json({error: "Access Denied."});
    }
}

module.exports = getUser;
*/