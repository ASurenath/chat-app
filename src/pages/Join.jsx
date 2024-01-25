import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../Redux/Slices/userSlice';


function Join({ socket }) {
  const [nickname, setNickname] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const register = () => {
    if(!nickname){
      alert("Please enter a nickname")
    }
    else{
      dispatch(updateUser(nickname))
    navigate('/main')
    socket.emit("register", { nickname })
  }
  }

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      register();
    }
  };

  return (
    <Container fluid={'sm'}>
      <div className='d-flex justify-content-center align-items-center m-5'>
        <input type="text" placeholder='Enter a nick name' onChange={(e) => { setNickname(e.target.value) }} onKeyDown={handleKeypress} className='form-control w-75' />
        <Button onClick={register}>Join</Button>
      </div>
    </Container>
  )
}

export default Join