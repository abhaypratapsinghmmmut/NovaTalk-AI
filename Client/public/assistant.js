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

    // popup.innerHTML = 


})();