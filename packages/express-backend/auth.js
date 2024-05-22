  import bcrypt from "bcrypt";
  import jwt from "jsonwebtoken";
  import dotenv from 'dotenv';
  import userServices from "./services/user-service.js";

  dotenv.config();

  export function registerUser(req, res) {
      const { username, pwd, rememberMe } = req.body; // from form
    
      if (!username || !pwd) {
        res.status(400).send("Bad request: Invalid input data.");
      }
      else{
        userServices.findUserByName(username).then((list) => {
          if (list.length){
            res.status(409).send("Username already taken");
          }
          else{
            bcrypt
            .genSalt(10)
            .then((salt) => bcrypt.hash(pwd, salt))
            .then((hashedPassword) => {
              generateAccessToken(username, rememberMe).then((token) => {
                console.log("Token:", token);
                
                userServices.addUser({username, hashedPassword}).then( () =>
                  {res.status(201).send({ token: token })}
                );

              });
            })
            .catch();
          }
          
      })}
    }


  function generateAccessToken(username, rememberMe) {
    // expiry for 30 days or for 1 hr w/o rememberMe
    const expires_when = rememberMe ? '30d' : '1h'; 
      return new Promise((resolve, reject) => {
        jwt.sign(
          { username: username },
          process.env.TOKEN_SECRET,
          { expiresIn: expires_when },
          (error, token) => {
            if (error) {
              reject(error);
            } else {
              resolve(token);
            }
          }
        );
      });
  }

  // do not protect signup or login page
  export function authenticateUser(req, res, next) {
      const authHeader = req.headers["authorization"];
      //Getting the 2nd part of the auth header (the token)
      const token = authHeader && authHeader.split(" ")[1];
      console.log('authenticate user')
      if (!token) {
        console.log("No token received");
        res.status(401).end();
      } else {
        jwt.verify(
          token,
          process.env.TOKEN_SECRET,
          (error, decoded) => {
            if (decoded) {
              next();
            } else {
              console.log("JWT error:", error);
              res.status(401).end();
            }
          }
        );
      }
  }

export function loginUser(req, res) {
    const { username, pwd, rememberMe } = req.body; // from form
    //find user creds in database
    userServices.findUserByName(
      username
    ).then((array) => {
  
      if (array.length === 0) {
        // invalid username
        res.status(401).send("Unauthorized");
      } else {
        const retrievedUser = array[0];
        bcrypt
          .compare(pwd, retrievedUser.hashedPassword)
          .then((matched) => {
            if (matched) {
              generateAccessToken(username, rememberMe).then((token) => {
                res.status(200).send({ token: token });
              });
            } else {
              // invalid password
              res.status(401).send("Unauthorized");
            }
          })
          .catch(() => {
            res.status(401).send("Unauthorized");
          });
    }});
}