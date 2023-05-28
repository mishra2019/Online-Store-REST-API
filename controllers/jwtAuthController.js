//importing reuired modules
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
// method to Verify the token
export const authenticateToken = (request, response, next) => {
  //getting token from headers
  const token = request.headers["authorization"];
  // if token is not present it will return a msg
  if (token == null) {
    return response.status(401).json({ msg: "token is missing" });
  }
  // verfying the token
  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
    if (error) {
      return response.status(403).json({ msg: "Invalid Token" });
    }
    request.user = user;
    // redirecting to the next method of respective routes
    next();
  });
};
