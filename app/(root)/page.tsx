"use client";

import PodcastCard from '@/components/PodcastCard'
import { podcastData } from '@/constants'
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import React from 'react'



const Home = () => {
  const tasks = useQuery(api.tasks.get);
  
  return (
    <div className='mt-6 flex flex-col'>
        <section className='flex flex-col gap-5'>
            <h1 className='text-20 font-bold text-white-1'>Trending Podcast</h1>

            <div className="flex min-h-screen flex-col items-center justify-between p-24 text-white-1">
              {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
            </div>

            <div className='podcast_grid'>
              {podcastData.map(({id, title, description, imgURL}) => (
                <PodcastCard key={id} title={title} imgURL={imgURL} description={description} podcastId={id}/>
              ))}
            </div>

                        
        </section>
    </div>
  )
}

export default Home