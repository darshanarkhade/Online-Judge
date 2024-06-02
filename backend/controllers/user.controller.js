import User from '../models/user.model.js';

export const getProfile = async (req, res, next) => {
    try{
        const user= await User.findById(req.username);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    }
    catch(error){
        next(error);
    }  
}   

export const deleteProfile = async (req, res, next) => {
    try{
        
        const user = await User.findByIdAndDelete(req.user._id);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.json({message: 'User deleted successfully'});
    }
    catch(error){
        next(error);
    }  
}

