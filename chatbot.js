const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatBox = document.querySelector(".chatbox");
const openChatBtn = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");


let userMessage;
const API_KEY = "" ;
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message,className) => {
    //Creating a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span> <p></p>` ;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
};

// const generateResponse = ()=>{
//     const API_URL = "https://api.openai.com/v1/chat/completions"

//     const requestOptions = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gpt-3.5-turbo",
//             messages: [{role: "user", content: userMessage}]
//         })
//     }

//     //Send POST request to API , get response
//     fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
//         console.log(data);
//     }).catch((error) => {
//         console.log(error);
//     }).finally(() => chatBox.scrollTo(0,chatBox.scrollHeight);)

// }

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;

    //append the user's message to the chatbox
    chatBox.appendChild(createChatLi(userMessage,"outgoing"));
    chatBox.scrollTo(0,chatBox.scrollHeight);

    //empty the chat box & set it's size to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`

    //Thinking...... message by bot
    setTimeout(()=>{
        chatBox.appendChild(createChatLi("Thinking...","incoming"));
        chatBox.scrollTo(0,chatBox.scrollHeight);
        //generating response from openAI
        // generateResponse()
    },500)
};

sendChatBtn.addEventListener("click",handleChat);


//Opening and Closing of ChatBot
openChatBtn.addEventListener("click", ()=> document.body.classList.toggle("show-chatbot"));
chatbotCloseBtn.addEventListener("click", ()=> document.body.classList.remove("show-chatbot"));


//Resizing Input Area based on its content
chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`
    chatInput.style.height = `${chatInput.scrollHeight}px`
});


// Sending input by clicking ENTER key and next line by ENTER + SHIFT Key
chatInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800){
        e.preventDefault();
        handleChat();
    }
});