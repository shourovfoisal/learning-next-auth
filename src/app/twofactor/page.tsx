"use client"
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const TwoFactor = () => {

  const router = useRouter();

  const searchParam = useSearchParams();

  const [verificationCode, setVerificationCode] = useState("");

  const handleSubmit = (e: any) => {
      e.preventDefault();
      signIn("twofactor", { 
        username: searchParam.get("user"), 
        verificationCode: verificationCode,
        redirect: false
      }).then((res) => {
        console.log("Two factor res is: ");
        console.log(res);
        if(!res?.error) {
          console.log("Two factor was successful");
          router.push("/extra");
        }
      });
  }

  return (
    <div>
        <label htmlFor="vcode"></label>
        <input 
            id='vcode' 
            value={verificationCode} 
            onChange={(e) => setVerificationCode(e.target.value)} 
        />
        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default TwoFactor