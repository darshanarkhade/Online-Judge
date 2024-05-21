export const getAllProblems= async (req, res, next)=>{
    try{
        const problems = await Problem.find();
        res.status(200).send(problems);
    }
    catch(error){
        next(error);
    }
}

export const getProblemDetails= async (req, res, next)=>{
    try{

    }
    catch(error){
        next(error);
    }
}

export const createProblem= async (req, res, next)=>{
    try{

    }
    catch(error){
        next(error);
    }
}

