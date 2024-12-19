import { User } from "../models/user.model.js";

export const checkUserExists = async (req, res, next) => {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    console.log(existingUser)
    if (existingUser) {
        console.log('user already exists')
        return res.status(400).json({
            success: false,
            message: 'User already exists, please login',
        });
    }else{

        next();
    }
};