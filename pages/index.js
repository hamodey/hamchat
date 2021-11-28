import React, { useContext }from "react";
import { Context } from "../context";
import { useRouter } from "next/dist/client/router";
import axios from "axios";

export default function Auth() {
  const router = useRouter()
  const {
    username,
    setUsername,
    secret,
    setSecret,
  } = useContext(Context)

  const onSubmit = (e) => {
    e.preventDefault()

    if(username.length === 0  || secret.length === 0) return;

    axios
      .put(
        "https://api.chatengine.io/users/",
        { username, secret },
        { headers: { "Private-Key": "24278c70-f25c-4dd5-90b0-e90ed15465a2" } }
      )

      .then((r) => {
        router.push("/chats");
      });
  }

  return (
  <div className="background">
    <div className="auth-container">
      <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
        <div className='auth-title'>HamChat</div>

        <div className='input-container'>
          <input 
            placeholder='Email'
            className='text-input'
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className='input-container'>
          <input 
            placeholder='Password'
            type='password'
            className='text-input'
            onChange={e => setSecret(e.target.value)}
          />
        </div>

        <button
          type='submit'
          className='submit-button'
        >
          Login / Sign Up
        </button>
      </form>
    </div>
  </div>)
}
