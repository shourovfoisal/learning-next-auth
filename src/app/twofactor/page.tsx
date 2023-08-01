"use client"
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'

const TwoFactor = () => {

  const searchParam = useSearchParams();

    const [verificationCode, setVerificationCode] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        signIn(
          "twofactor", 
          { 
            username: searchParam.get("name"), 
            verificationCode: verificationCode,
            callbackUrl: "/extra"
          }
          );
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