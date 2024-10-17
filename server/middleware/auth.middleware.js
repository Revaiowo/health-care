import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next)=>{

    const { token } = req.cookies;

    if (!token) return res.status(400).json({
        success: false,
        message: "You need to log in!"
    });

    jwt.verify(token, process.env.JWT_SECRET, (error, payload)=>{

        if (error) return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });

        req.userId = payload._id;
        next();
    })
}