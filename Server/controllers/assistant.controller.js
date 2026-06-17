import { generateGeminiResponse } from "../configs/gemini.js";
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


export const askAssistant = async (req,res) => {
    try {
        
        const {message, userId} = req.body;

        if(!message || !userId){
            return res.status(400).json({message:"message and userid are required"})
        }

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({message:"user not found"});
        }

        if(!user.geminiApiKey){
            return res.status(404).json({message:"gemini api key is required"});
        }

        if(user.plan == "free" && user.totalMessages >= user.requestLimit){
            return res.status(400).json({message:"free limit reached"});
        }

        if(user.plan == "pro" && new Date(user.proExpiresAt) < new Date()){
            user.plan == "free";
            await user.save();

            return res.status(400).json({message:"pro plan expired"});

        }

        const cleanMessage = message.toLowerCase()

        const cleanMessage = message.toLowerCase();

        if (user.enableNavigation) {

            // Navigation Commands
            const navigationWords = [
                "open",
                "go",
                "start",
                "show",
                "navigate",
                "take me",
            ];

            // Check navigation intent
            const wantsNavigation =
                navigationWords.some((word) =>
                    cleanMessage.startsWith(word)
                );

                

            // User wants navigation
            if (wantsNavigation) {

                // Find matching page
                const matchedPage =
                    user.pages.find((page) =>

                        page.keywords.some((keyword) =>

                            cleanMessage.includes(
                                keyword.toLowerCase()
                            )

                        )

                    );

                // Page found
                if (matchedPage) {

                    // Already open
                    if (
                        req.body.currentPath ===
                        matchedPage.path
                    ) {

                        return res.json({
                            success: true,

                            response:
                                `${matchedPage.name} already open`
                        });
                    }

                    // Navigate
                    return res.json({
                        success: true,

                        action: "navigate",

                        path: matchedPage.path,

                        response:
                            `Opening ${matchedPage.name}`,
                    });
                }
            }
        }

        const prompt = `
                        You are ${user.assistantName}.

                        Business Name:
                        ${user.businessName}

                        Business Type:
                        ${user.businessType}

                        Business Description:
                        ${user.businessDescription}

                        Assistant Tone:
                        ${user.tone}

                        Rules:

                        - Keep replies under 15 words
                        - Give fast direct responses
                        - Talk naturally
                        - Behave like smart voice assistant
                        - Avoid long explanations
                        - Keep responses short for quick voice playback

                        User Question:
                        ${message}
                        
                        `; 


        const aiResponse = await generateGeminiResponse(prompt, user.geminiApiKey, user)

        if(user.plan === "free"){
            user.totalMessages +=1;
        }

        await user.save();

        return res.json({
            success:true,
            aiResponse
        })



    } catch (error) {
        return res.status(500).json({success:false, message: "Assistant AI Error"})
    }
}
