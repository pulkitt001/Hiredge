import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "10d" });

    res.cookie(
        "jwt", token, {
            httpOnly: true,           // Prevent XSS
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
            sameSite: "None",         // Cross-site requests allowed
            secure: true,             // Only over HTTPS
        }
    );
};

export default generateTokenAndSetCookie;
