import './App.css';
import gptlogo from './asest/chatgptt.svg';
import addBtn from './asest/add-30.png';
import msgIcon from './asest/message.svg';
import home from './asest/home.svg';
import saved from './asest/bookmark.svg';
import rocket from './asest/rocket.svg';
import sendBtn from './asest/send.svg';
import userIcon from './asest/user-icon.png';
import gptImgLogo from './asest/chatgptLogo.svg';
import { sendMsgToOpenAI } from './openai';
import { useEffect, useRef, useState } from 'react';


function App() {
  const msgEnd = useRef(null);
  const [input,setInput] = useState("");
  const[messages , setMessages] = useState([
    {
            text:"I am ChatGPT, a computer program created by OpenAI. I'm here to provide information, answer your questions, and engage in conversations on a wide range of topics to the best of my knowledge and abilities. How can I assist you today?",
            isBot:true,

  }
]);

useEffect(()=>{
  msgEnd.current.scrollIntoView();
},[messages]);

   const handleSend = async () =>{
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      {text, isBot: false}
    ])
    const res = await sendMsgToOpenAI(text);
    setMessages([
      ...messages,
       {text ,isBot: false},
       {text:res , isBot:true}
    ])
   }
   const handleEnter = async (e) =>{
      if (e.key === 'Enter' ) await handleSend();
   }
   const handleQuery = async (e) =>{
    const text = e.target.value;
    setMessages([
      ...messages,
      {text, isBot: false}
    ])
    const res = await sendMsgToOpenAI(text);
    setMessages([
      ...messages,
       {text ,isBot: false},
       {text:res , isBot:true}
    ]);
   }
  return (
    <div className="App">
       <div className="sideBar">
          <div className="upperSide">
              <div className="upperSideTop"><img src = {gptlogo} alt="Logo" className="logo"/><span className="brand"/>ChatGpt</div>
              <button className='midBtn' onClick={()=>{window.location.reload()}}><img src={addBtn} alt="New Chat+" className='addBtn'/>New Chat</button>
              <div className='upperSideBottom'>
                <button className='query' onClick={handleQuery} value={"What is Programming ?"}><img src={msgIcon} alt="Query"/>What is Programming</button>
                <br></br>
                <button className='query' onClick={handleQuery} value={"How to use an API?"}><img src={msgIcon} alt="Query"/>How to use an API</button>
              </div>
          </div>
          <div className="lowerside">
             <div className='listitems'><img src={home} alt="" className='listitemsImg'/>Home</div>
             <div className='listitems'><img src={saved} alt="" className='listitemsImg'/>Saved</div>
             <div className='listitems'><img src={rocket}alt="" className='listitemsImg'/>Upgrade To Pro</div>
          </div>
       
        </div>
        <div className='main'>
            <div className='chats'>
             
            
               {messages.map((message,i) => 
                <div key={i} className={message.isBot?"chat bot":"chat"}>
                   <img className="chatimg" src={message.isBot?gptImgLogo:userIcon} alt=""/><p className='txt'>{message.text}</p>
               </div>
               )}
               <div ref={msgEnd}/>
            </div>
            <div className='chatFooter'>
              <div className='inp'>
                <input type='text' name="" id="" placeholder='Send a message' value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}}/><button className='send' onClick={handleSend}><img src={sendBtn} alt="Send" ></img></button>

              </div>
              <p>Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT September 25 Version</p>
            </div>
          </div>
    </div>
  );
}

export default App;
