(function(){

    const script = document.currentScript;

    const userId = script?.dataset?.userId;

    const theme = "dark";

    const assistantConfig = null;

    // load css

    const link = document.createElement("link")

    link.rel = "stylesheet"
    link.href = "http://localhost:5173/assistant.css"


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

            <div class="nova-orb"></div>

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
            <img src="http://localhost:5173/mic.svg" alt="mic" class="nova-mic-icon" />
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
                        src="http://localhost:5173/logo.png"
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


    


})();