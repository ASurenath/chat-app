import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Chat from '../components/Chat';
import Userlist from '../components/Userlist';
import { Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Home({ socket }) {
  const navigate=useNavigate()
  const currentUser = useSelector(state => state.userReducer)
  const [nicknames, setNicknames] = useState({})
  useEffect(()=>{
    currentUser==="" && navigate('/')
  },[])

  useEffect(() => {
    socket.on("recieveUserlist", (data) => {
      console.log("test", data);
      setNicknames(data?.nicknames)
    })
  }, [socket])
  return (
    <Container fluid={'sm'}>
      <div className='d-flex justify-content-between'>
        <h5>Connected as <span className='fs-2 text-success'>{currentUser}</span></h5> <Link to={'/'}><Button variant='danger'>Exit</Button></Link>
      </div>      
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="my-1 p-1 bg-dark rounded-3 "
        fill="true"
      >
        <Tab eventKey="home" title="Chat">
          <Chat socket={socket} nicknames={nicknames}/>
        </Tab>
        <Tab eventKey="users" title="Users">
          <Userlist nicknames={nicknames} />
        </Tab>

      </Tabs>
    </Container>
  )
}

export default Home