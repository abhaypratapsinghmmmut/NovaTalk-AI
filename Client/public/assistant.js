(function(){

    const script = document.currentScript;

    const userId = script?.dataset?.userId;

    const theme = "dark";

    let assistantConfig = null;

    // load css

    const link = document.createElement("link")

    link.rel = "stylesheet"
    link.href = "https://novatalk-ai-bifg.onrender.com/assistant.css"


    document.head.appendChild(link);

    
    // create popup

    const popup = document.createElement("div");

    popup.className = `nova-popup theme-${theme}`

    popup.innerHTML = `
    
    <div class="nova-overlay"></div>

    <div class="nova-content">

    <div class="nova-top">

        <div class="nova-orb-wrap">

            <div class="nova-orb-glow"></div>

            <div class="nova-orb">
            </div>

        </div>

        <h2 class="nova-title">
            Hello! I'm Nova AI
        </h2>

        <p class="nova-sub">
        Your smart voice assistant.
        <br/>
        Ask anything about your website.
        </p>

        <div class="nova-status">
            Tap button to Speak
        </div>

        <div class="nova-wave">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>


        <!-- User Text -->
        <div class="nova-user-text"></div>

        <!-- AI Text -->
        <div class="nova-ai-text"></div>
            
    </div>

    <div class="nova-bottom">
        <button class="nova-mic">
            <img src="https://novatalk-ai-bifg.onrender.com/mic.png" alt="mic" class="nova-mic-icon" />
        </button>
    </div>

    </div>

    `;

    document.body.appendChild(popup);

    //floating button

    const button = document.createElement("button");

    button.className = `nova-btn theme-${theme}`

    button.innerHTML = `
                        <img
                        src="https://novatalk-ai-bifg.onrender.com/logo.png"
                        alt="logo"
                        />
                        `;


    document.body.appendChild(button);


    //toggle popup

    let open = false;

    button.onclick = () =>{
        open = !open;

        popup.style.display = open ? "flex" : "none";
    }


    // load assistant

    const loadAssistant = async () => {
        try {
            
            const res = await fetch(`https://novatalk-ai-server.onrender.com/api/assistant/config/${userId}`)

            const data = await res.json();

            console.log(data);

            if(data){
                assistantConfig = data.user;
                applyConfig();
            }
            console.log("API Response:", data);

        } catch (error) {
            console.log(error)
        }
    }

    const applyConfig = ()=>{
        if(!assistantConfig){
            return;
        }

        popup.className = `nova-popup theme-${assistantConfig.theme}`

        button.className = `nova-btn theme-${assistantConfig.theme}`

        const title = popup.querySelector(".nova-title")

        title.innerHTML = `Hello I'm ${assistantConfig.assistantName}`;

        const subTitle = popup.querySelector(".nova-sub");

        subTitle.innerHTML = `
                                Welcome to
                                ${assistantConfig.businessName}.
                                <br />
                                Ask anything about your website.
                                `;

    }


    loadAssistant();


    // element

    const status = popup.querySelector(".nova-status")

    const wave = popup.querySelector(".nova-wave")
    
    const userText = popup.querySelector(".nova-user-text");

    const aiText = popup.querySelector(".nova-ai-text");

    const mic = popup.querySelector(".nova-mic");


    //text-speech function

    const speak = (text) =>{
        window.speechSynthesis.cancel();

        //show ai response
        aiText.innerText = text;

        status.innerText = "AI Speaking...";

        const speech = new SpeechSynthesisUtterance(text)

        speech.lang = "hi-IN";

        speech.rate = 1;

        speech.pitch = 1;

        speech.volume = 1;

        speech.onend = () =>{

            status.innerText = "Tap button to speak";

            wave.style.opacity = "0";

        }

        window.speechSynthesis.speak(
            speech
        );



    }

    const speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;

    if(speechRecognition){
        const recognition = new speechRecognition();

        recognition.lang = "en-US";

        recognition.continuous = false;

        recognition.interimResults = false;

        mic.onclick = () => {
            wave.style.opacity = "1";

            status.innerText = "Listening...";

            userText.innerText = "";

            aiText.innerText = "";

            recognition.start();
        }

        recognition.onresult = (e)=>{
            const text = e.results[0][0].transcript

            userText.innerText = "You: " + text;

            recognition.stop();

            setTimeout(async () => {
                try {
                    status.innerText = "Thinking...";

                    const res = await fetch("https://novatalk-ai-server.onrender.com/api/assistant/ask" , {
                        method: "POST",
                        headers:{
                            "content-Type":
                            "application/json",
                        } , 
                        body: JSON.stringify({
                            message: text , userId
                        })
                    })

                    const data = await res.json();

                    console.log(data)

                    if(data.success){
                        if(data.action === "navigate"){
                            speak(data.response)

                            setTimeout(()=>{
                                window.location.href = data.path
                            },1500)
                        }
                        else{
                            speak(data.aiResponse)
                        }
                    }
                    else{
                        speak("Response error. Please Check your Plan")
                    }





                } catch (error) {
                    console.log(error)
                    speak("server error")
                }
            },600)
        };

        recognition.onerror = () => {
            status.innerText = "Tap Button to Speak";

            wave.style.opacity = "0";
        }


    }
    else{
        status.innerText = "speech recognition not supported";
    }


})();
