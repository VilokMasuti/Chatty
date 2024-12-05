import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  try {
    // Validate environment variable
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    // Create the JWT
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set the token in an HTTP-only cookie
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      httpOnly: true, // Prevent XSS attacks
      sameSite: "strict", // Prevent CSRF attacks
      secure: process.env.NODE_ENV !== "development", // Use HTTPS in production
    });

    return token; // Optional: return token if needed elsewhere
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw new Error("Token generation failed"); // Throwing an error to handle in the caller
  }
};

export default generateToken;
