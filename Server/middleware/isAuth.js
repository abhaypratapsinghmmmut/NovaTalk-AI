

export const isAuth = async (req,res,next) => {
    try {
        const token = req.cookies

        if(!token){
            return res.status(400).json({message:"user does not have token"})
        }

        const verifyToken = JsonWebTokenError.verify(token , process.env.JWT_SECRET);

        if(!verifyToken){
            return res.status(400).json({message:"user does not have valid token"})
        }

        req.userId = verifyToken.userId

        next();

    } catch (error) {
        return res.status(500).json({message:`logout failed ${error}`})
    }
}