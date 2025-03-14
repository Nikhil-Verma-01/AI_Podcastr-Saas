import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const Page = () => {
  return (
    <div className='flex-center glassmorphism-auth h-screen w-full'>
        <SignIn/>
    </div>
  )
}

export default Page