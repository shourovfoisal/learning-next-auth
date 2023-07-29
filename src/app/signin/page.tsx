"use client"
import { signIn } from 'next-auth/react'
import Router from 'next/router'
import React, { useState } from 'react'

type LoginData = {
  username: string,
  password: string
}

type Props = {}

const SignIn = (props: Props) => {

  const [loginData, setLoginData] = useState({} as LoginData);

  const handleLogin = async () => {
    signIn("credentials", { ...loginData, redirect: false })
    // .then(
    //   (loginInfo: any) => {
    //       console.log(loginInfo);
    //       !loginInfo.error ? Router.push("/extra") : null
    //   }
    // );
  }

  return (
    <div>
      <input 
        type="text" 
        placeholder='username' 
        onChange={e => setLoginData(prevData => ({ ...prevData, username: e.target.value }))} 
      />
      <input 
        type="password" 
        placeholder='password' 
        onChange={e => setLoginData(prevData => ({ ...prevData, password: e.target.value }))}
      />
      <button type='button' onClick={handleLogin}>Login</button>
    </div>
  )
}

export default SignIn