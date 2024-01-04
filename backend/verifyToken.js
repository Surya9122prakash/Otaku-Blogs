const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId); // Assuming req.userId holds the user's ID

        if (!user || !user.token) {
            return res.status(401).json("You are not authenticated!");
        }

        const token = user.token;

        jwt.verify(token, process.env.SECRET, (err, data) => {
            if (err) {
                return res.status(403).json("Token is not valid!");
            }

            req.userId = data._id;
            next();
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json("Internal Server Error");
    }
};

module.exports = verifyToken;
