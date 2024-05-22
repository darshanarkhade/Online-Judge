import User from '../models/user.model.js';

export const getLeaderboard= async (req, res, next)=>{
    try{
        // Get top 10 players sorted by noOfProblemSolved in descending order and then by username in ascending order
        const topPlayers= await User.find().sort({noOfProblemSolved: -1, username:1}).limit(10);
        res.status(200).json(topPlayers);
    }
    catch(error){
        next(error);
    }
}
