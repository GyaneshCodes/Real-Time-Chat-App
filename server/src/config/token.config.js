import jwt from "jsonwebtoken";
const genToken = async (userId) => {
  try {
    const token = await jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_SECRET_EXPIRED,
    });
    return token;
  } catch (error) {
    console.log("Error while generating token");
  }
};

export default genToken;
