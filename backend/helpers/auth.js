const pool = require('../db.js');

const queryDBCredentials = async (user) => {
    //Ensuring that the credentials are within the database
};

const addDBCredentials = async (user, pass) => {
    //Adding the credentials to the database
};

const generateRefreshToken = (username) => {
    return jwt.sign({ username }, 'jwtSecret', { expiresIn: '3d' }); 
}

const generateAccessToken = (username) => {
    return jwt.sign({ username }, 'jwtSecret', { expiresIn: '30m' }); //We need to define this secret as something else usually a 64 hex code or smth
}

module.exports = {queryDBCredentials, addDBCredentials, generateRefreshToken, generateAccessToken, addSkill, removeSkill}