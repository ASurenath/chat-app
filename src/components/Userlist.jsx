import React, { useEffect, useState } from 'react'
// import io from 'socket.io-client';
// const socket = io.connect('http://localhost:3001'); // Replace with your server URL


function Userlist({ nicknames }) {
    return (
        <div className='border border-4 border-dark rounded-3 p-3' style={{ height: '80vh' }}>
            <div className='d-flex justify-content-center'>
                <ul>
                    <h3 className='text-center'>Users</h3>
                    {Object.keys(nicknames).map(i =>
                        <li key={i} className='fs-4' style={{ color: "green" }}>
                            {nicknames[i]} <br />
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Userlist