"use client"
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type LoginData = {
  username: string,
  password: string
}

type Props = {}

const SignIn = (props: Props) => {

  const router = useRouter();

  const [loginData, setLoginData] = useState({} as LoginData);

  const handleLogin = async () => {

    signIn("userpass", {
      ...loginData, 
      redirect: false 
    }).then((res) => {
      console.log("Login res is: ");
      console.log(res);
      if(!res?.error) {
        console.log("Login was successful");
        router.push("/");
      }
    });
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