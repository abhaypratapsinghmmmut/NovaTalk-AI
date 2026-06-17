import User from "../model/user.model.js";

export const getAssistantConfig = async (req,res) => {
    try {
        const {userId} = req.params;

        const user = await User.findById(userId).select("-geminiAPIkey");
        if(!user){
            return res.status(404).json({message:"failed to get user"});
        }

        return res.status(200).json({message:"assistant config data" , user});

    } catch (error) {
        return res.status(500).json({message:`assistant config failed ${error}`});
    }
}