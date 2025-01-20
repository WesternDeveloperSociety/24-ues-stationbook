const { queryDBCredentials, addDBCredentials, generateRefreshToken, generateAccessToken } = require('../helpers/auth.js');


const test = async(req, res) => {
    const{inputInfo} = req.body;
    try{
        console.log(inputInfo);
        res.status(200).json({ message: "Hello World!" });
    } catch (error) {
        res.status(500).json({ message: `Internal Server Error: ${error.message}`})
    }
}

const register = async(req, res) => {
    const { username, password } = req.body;
    let inDB = await queryDBCredentials(username, password)
    
    if (!inDB) {
        await addDBCredentials(username, password);
        res.send('Your data was appended');
    }
    else{
        return res.status(400).send('Already in database. Provide different credentials'); 
    }
}

const login = async(req, res) => {
    const { username, password } = req.body;
    
    let inDB = queryDBCredentials(username, password);

    if (inDB) {
        const accessToken = generateAccessToken(username);
        const refreshToken = generateRefreshToken(username);

        res.cookie('refreshToken', refreshToken, { //The name of the token should be sent under 'refreshToken' in the frontend
            httpOnly: true,
            sameSite: 'None', 
            secure: true, 
            maxAge: 1000 * 60 * 60 * 24 * 3 // 1000 ms x 60 s * 60 m * 24 hr * 3d
        });
        res.json({ accessToken });
    } else {
        res.status(401).send('Not in Database');
    }
}

const returnAccess = async(req, res) => {
    const refreshToken = req.cookies.refreshToken; // Extract token from HttpOnly cookie
    if (!refreshToken) return res.status(401).json({ message: 'No refresh token provided' });
  
    jwt.verify(refreshToken, 'jwtSecret', (err, user) => { //We need to define this secret as something else usually a 64 hex code or smth
      if (err) return res.status(403).send("Invalid Refresh Token");
  
      const newAccessToken = generateAccessToken(user.username);
      res.json({ accessToken: newAccessToken }); //Sending back the new access token if the refresh token is valid
    });
};

const verifyJWT = (req, res, next) => { //This is for authorization 
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token part from "Bearer <token>" - Bearer should be apart of the content sent with the access token (An OAUTH standard I believe)
  
    if (!token) {
        return res.status(401).send("Token is required");
    }
    jwt.verify(token, 'jwtSecret', (err, decoded) => {
        if (err) {
            return res.status(403).json({ auth: false, message: "Authorization failed" });
        }
        req.userID = decoded.username;
        next();
    });
};

module.exports = {
    test,
    register,
    login, 
    returnAccess, 
    verifyJWT
}