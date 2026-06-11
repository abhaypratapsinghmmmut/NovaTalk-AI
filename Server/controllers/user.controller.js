import User from '../model/user.model.js'



export const getCurrentUser = async (req,res) => {
    try {
        
        const user = await User.findById(req.userId);

        if(!user){
            return res.status(404).json({message:"failed to get current user"});
        }

        return res.status(200).json(user);
        

    } catch (error) {
        return res.status(500).json({message:`get current user error ${error}`});
    }
}

export const saveAssistant = async (req,res) => {
    try {
        const {assistantName, businessName, businessType, businessDescription, tone, theme, geminiApiKey, pages} = req.body;

        const user = await User.findById(req.userId);

        if(!user){
            return res.status(404).json({message:"failed to get current user"});
        }

        user.assistantName = assistantName;
        user.businessName = businessName;
        user.businessDescription = businessDescription;
        user.businessType = businessType;
        user.tone = tone;
        user.theme = theme;

        if(geminiApiKey){
            user.geminiApiKey = geminiApiKey;
        }

        user.geminiStatus = "active";
        user.pages = pages || [];

        user.isSetupComplete = true;

        await user.save();

        return res.status(200).json({message: "user saved successfully" , user})

    } catch (error) {
        return res.status(500).json({message: `failed to save assistant ${error}`})
    }
}