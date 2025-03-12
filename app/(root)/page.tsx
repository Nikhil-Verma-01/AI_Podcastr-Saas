import { Button } from '@/components/ui/button'
import React from 'react'

const Home = () => {
  return (
    <div className='mt-6 flex flex-col'>
        <section className='flex flex-col gap-5'>
            <h1 className='text-20 font-bold text-white-1'>Trending Podcast</h1>
            <Button className='text-white-1'>Button</Button>

        </section>
    </div>
  )
}

export default Home