import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap';
import ScrollToBottom from 'react-scroll-to-bottom';

// import io from 'socket.io-client';



function Chat({ socket, nicknames }) {
  const [lastSender, setLastsender] = useState("")
  const [chatlist, setChatlist] = useState({})
  const [currentMessage, setCurrentMessage] = useState("")
  const ref = useRef < HTMLDivElement > (null);
  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [chatlist])

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const data = {
        message: currentMessage,
        author: socket.id,
        date: Date.now()
      }
      await socket.emit("sendMessage", data)
      setChatlist({ ...chatlist, [data.date]: { ...data, send: true, type: "message", samesender: socket.id == lastSender } });
      setLastsender(socket.id)
      console.log(chatlist);
      setCurrentMessage("");
    }
  }
  const handleKeypress = async (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      await sendMessage();
    }
  };
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setChatlist({ ...chatlist, [data.date]: { ...data, send: false, type: "message", samesender: data.sender == lastSender } });
      setLastsender(data.sender)
    })
  }, [socket, chatlist])
  useEffect(() => {
    socket.on("notification", (data) => {
      //// console.log(chatlist);
      setChatlist({ ...chatlist, [data.date]: data });
      setLastsender("")
    })
  }, [socket, chatlist])

  return (
    <div className='d-flex justify-content-center border border-4 border-dark rounded-3 p-3' style={{ minHeight: '85vh' }}>
      <div style={{ width: "min(95vw,600px)", position: 'relative' }} className='rounded-2'>
        <ScrollToBottom className='chatbody' behavior={'smooth'}>
          {Object.keys(chatlist)?.map(i =>
            chatlist[i].type == "message" ?
              <div key={i} className={chatlist[i].send ? 'sent' : 'received'}>
                {/* {new Date(chatlist[i].date)} */}
                {!chatlist[i].samesender &&
                  <div className='sender'>{chatlist[i].author === socket.id ? 'You:' : `${nicknames[chatlist[i].author]}:`}</div>
                }
                <div className='bubble'>{chatlist[i].message}</div>
              </div>
              :
              <div key={i} className='text-dark notification'><i>{chatlist[i].nickname}&nbsp;{chatlist[i].type}</i></div>
          )}
        </ScrollToBottom>

        <div style={{ display: 'flex', position: 'sticky', bottom: '0', left: '0', width: '100%' }} >
          <input type="text" value={currentMessage} contentEditable onChange={(e) => setCurrentMessage(e.target.value)} onKeyDown={handleKeypress} className='form-control' placeholder='Say hello...' />
          <Button onClick={sendMessage} variant='success'>Send</Button>
        </div>
      </div>
    </div>
  )
}

export default Chat